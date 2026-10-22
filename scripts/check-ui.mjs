import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";
import { runInNewContext } from "node:vm";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const source = readFileSync(resolve(root, "assets/site.js"), "utf8");
const pages = ["index.html", "data-engineering.html", "analytics.html", "website.html", "privacy.html", "cookies.html"];

// Only the DOM behavior used by the drawer is modeled. Live browser checks must
// also verify layout, the native Tab order, and actual inert behavior.
class Element {
  constructor(tagName, classes = "", attributes = {}) {
    this.tagName = tagName.toUpperCase();
    this.attributes = new Map(Object.entries(attributes));
    this.children = [];
    this.parentElement = null;
    this.style = { overflow: "" };
    this.listeners = new Map();
    this.inert = false;
    this.disabled = false;
    this.hidden = false;
    this.textContent = "";
    const values = new Set(classes.split(" ").filter(Boolean));
    this.classList = {
      contains: (name) => values.has(name),
      add: (name) => values.add(name),
      remove: (name) => values.delete(name),
      toggle: (name, force = !values.has(name)) => {
        if (force) values.add(name);
        else values.delete(name);
        return force;
      },
    };
  }
  append(...children) {
    for (const child of children) {
      child.parentElement = this;
      this.children.push(child);
    }
  }
  setAttribute(name, value) { this.attributes.set(name, String(value)); }
  getAttribute(name) { return this.attributes.get(name) ?? null; }
  removeAttribute(name) { this.attributes.delete(name); }
  hasAttribute(name) { return this.attributes.has(name); }
  addEventListener(name, handler) {
    const handlers = this.listeners.get(name) ?? [];
    handlers.push(handler);
    this.listeners.set(name, handlers);
  }
  dispatch(name, detail = {}) {
    const event = { target: this, defaultPrevented: false, preventDefault() { this.defaultPrevented = true; }, ...detail };
    for (const handler of this.listeners.get(name) ?? []) handler(event);
    return event;
  }
  contains(element) { return this === element || this.children.some((child) => child.contains(element)); }
  matches(selector) {
    const parts = selector.trim().split(/\s+/);
    if (parts.length > 1) {
      if (!this.matches(parts.pop())) return false;
      let ancestor = this.parentElement;
      while (parts.length) {
        const part = parts.pop();
        while (ancestor && !ancestor.matches(part)) ancestor = ancestor.parentElement;
        if (!ancestor) return false;
        ancestor = ancestor.parentElement;
      }
      return true;
    }
    const excluded = [...selector.matchAll(/:not\(([^)]+)\)/g)].map((match) => match[1]);
    if (excluded.some((value) => this.matches(value))) return false;
    const simple = selector.replace(/:not\([^)]+\)/g, "").trim();
    const tag = simple.match(/^[a-z]+/i)?.[0];
    if (tag && this.tagName !== tag.toUpperCase()) return false;
    for (const match of simple.matchAll(/\.([\w-]+)/g)) if (!this.classList.contains(match[1])) return false;
    for (const match of simple.matchAll(/\[([\w-]+)(?:="([^"]*)")?\]/g)) {
      if (match[1] === "disabled") { if (!this.disabled) return false; }
      else if (!this.hasAttribute(match[1]) || (match[2] !== undefined && this.getAttribute(match[1]) !== match[2])) return false;
    }
    return Boolean(tag || simple.startsWith(".") || simple.startsWith("["));
  }
  querySelectorAll(selector) {
    return this.children.flatMap((child) => [child, ...child.querySelectorAll("*")]).filter((child) => selector === "*" || selector.split(",").some((part) => child.matches(part)));
  }
  querySelector(selector) { return this.querySelectorAll(selector)[0] ?? null; }
  focus() {
    for (let ancestor = this; ancestor; ancestor = ancestor.parentElement) if (ancestor.inert || ancestor.hidden) return;
    this.document.activeElement = this;
    this.document.dispatch("focusin", { target: this });
  }
  getClientRects() { return this.hidden ? [] : [{}]; }
}

function fixture({ activePage = false } = {}) {
  const document = new Element("document");
  const body = new Element("body");
  const header = new Element("header", "nav");
  const logo = new Element("a", "logo", { href: "/" });
  const trigger = new Element("button", "hamburger", { "aria-expanded": "false" });
  const navLinks = new Element("ul", "nav-links");
  const activeLink = new Element("a", "", { href: "/data-engineering", "aria-current": "page" });
  const scrim = new Element("div", "scrim");
  const drawer = new Element("aside", "drawer", { "aria-hidden": "true", role: "dialog" });
  const first = new Element("a", "logo", { href: "/" });
  const close = new Element("button", "drawer-close");
  const service = new Element("a", "", { href: "/data-engineering" });
  const last = new Element("a", "btn", { href: "mailto:christian.g.callahan@cgclabs.org" });
  const main = new Element("main");
  const backgroundLink = new Element("a", "", { href: "/analytics" });
  const existingInert = new Element("section");
  existingInert.inert = true;
  drawer.inert = true;
  body.style.overflow = "scroll";
  header.append(logo, trigger);
  if (activePage) {
    navLinks.append(activeLink);
    header.append(navLinks);
  }
  drawer.append(first, close, service, last);
  main.append(backgroundLink);
  body.append(header, scrim, drawer, main, existingInert);
  document.append(body);
  document.body = body;
  for (const element of [document, ...document.querySelectorAll("*")]) element.document = document;
  document.activeElement = trigger;
  const mediaListeners = [];
  const desktop = { matches: false, addEventListener: (_name, handler) => mediaListeners.push(handler) };
  const windowListeners = new Map();
  const window = {
    innerWidth: 375,
    scrollY: 0,
    matchMedia: (query) => query.includes("min-width") ? desktop : { matches: true },
    addEventListener: (name, handler) => windowListeners.set(name, handler),
  };
  runInNewContext(source, { window, document, HTMLElement: Element, console }, { filename: "assets/site.js", timeout: 1000 });
  return {
    document, body, header, logo, activeLink, trigger, scrim, drawer, first, close, service, last, main, backgroundLink, existingInert,
    key: (key, shiftKey = false) => document.dispatch("keydown", { key, shiftKey }),
    resize: () => {
      desktop.matches = true;
      window.innerWidth = 1280;
      for (const listener of mediaListeners) listener({ matches: true });
      windowListeners.get("resize")?.();
    },
  };
}

function expectClosed(ui, restoreTrigger = true) {
  assert.equal(ui.drawer.inert, true);
  assert.equal(ui.drawer.getAttribute("aria-hidden"), "true");
  assert.equal(ui.trigger.getAttribute("aria-expanded"), "false");
  assert.equal(ui.drawer.classList.contains("open"), false);
  assert.equal(ui.header.inert, false);
  assert.equal(ui.main.inert, false);
  assert.equal(ui.existingInert.inert, true);
  assert.equal(ui.body.style.overflow, "scroll");
  assert.equal(ui.drawer.contains(ui.document.activeElement), false);
  if (restoreTrigger) assert.equal(ui.document.activeElement, ui.trigger);
}

test("opening the menu exposes the dialog and isolates the background", () => {
  const ui = fixture();
  ui.trigger.dispatch("click");
  assert.equal(ui.drawer.inert, false);
  assert.equal(ui.drawer.getAttribute("aria-hidden"), "false");
  assert.equal(ui.drawer.getAttribute("aria-modal"), "true");
  assert.equal(ui.trigger.getAttribute("aria-expanded"), "true");
  assert.equal(ui.header.inert, true);
  assert.equal(ui.main.inert, true);
  assert.equal(ui.existingInert.inert, true);
  assert.equal(ui.scrim.inert, false);
  assert.equal(ui.body.style.overflow, "hidden");
  assert.equal(ui.document.activeElement, ui.first);
});

test("Tab wraps forward and Shift+Tab wraps backward within the open menu", () => {
  const ui = fixture();
  ui.trigger.dispatch("click");
  ui.last.focus();
  assert.equal(ui.key("Tab").defaultPrevented, true);
  assert.equal(ui.document.activeElement, ui.first);
  assert.equal(ui.key("Tab", true).defaultPrevented, true);
  assert.equal(ui.document.activeElement, ui.last);
  ui.service.focus();
  assert.equal(ui.key("Tab").defaultPrevented, false);
});

test("an outside focus event returns focus to the open menu", () => {
  const ui = fixture();
  ui.trigger.dispatch("click");
  ui.document.activeElement = ui.backgroundLink;
  ui.document.dispatch("focusin", { target: ui.backgroundLink });
  assert.equal(ui.document.activeElement, ui.first);
});

for (const method of ["Escape", "close button", "scrim", "navigation link"]) {
  test(`${method} closes the menu and restores previous focus, inert state, and scrolling`, () => {
    const ui = fixture();
    ui.trigger.dispatch("click");
    if (method === "Escape") ui.key("Escape");
    else ui[method === "close button" ? "close" : method === "navigation link" ? "service" : "scrim"].dispatch("click");
    expectClosed(ui);
  });
}

test("repeated open requests do not replace the saved background state", () => {
  const ui = fixture();
  ui.trigger.dispatch("click");
  ui.trigger.dispatch("click");
  ui.key("Escape");
  expectClosed(ui);
  ui.trigger.dispatch("click");
  ui.key("Escape");
  expectClosed(ui);
});

for (const activePage of [false, true]) {
  test(`desktop resize closes the dialog and focuses ${activePage ? "the active navigation link" : "the home logo"}`, () => {
    const ui = fixture({ activePage });
    ui.trigger.dispatch("click");
    ui.resize();
    expectClosed(ui, false);
    assert.equal(ui.document.activeElement, activePage ? ui.activeLink : ui.logo);
  });
}

test("Escape and Tab leave background focus alone while the menu is closed", () => {
  const ui = fixture();
  ui.backgroundLink.focus();
  assert.equal(ui.key("Escape").defaultPrevented, false);
  assert.equal(ui.key("Tab").defaultPrevented, false);
  assert.equal(ui.document.activeElement, ui.backgroundLink);
});

for (const file of pages) {
  test(`${file}: dialog is closed before scripts run and inquiry links describe email`, () => {
    const html = readFileSync(resolve(root, file), "utf8");
    const drawer = html.match(/<aside\b[^>]*class="drawer"[^>]*>/)?.[0];
    assert.ok(drawer, `${file}: menu dialog missing`);
    assert.match(drawer, /\binert(?:\s|=|>)/);
    assert.match(drawer, /\baria-hidden="true"/);
    assert.match(drawer, /\brole="dialog"/);
    assert.doesNotMatch(html, /Book a call|message sent|call booked|booking confirmed/i);
    const inquiryLinks = [...html.matchAll(/href="(mailto:[^"]+)"/g)]
      .map(([, raw]) => new URL(raw.replaceAll("&amp;", "&")))
      .filter((url) => url.searchParams.has("subject"));
    assert.ok(inquiryLinks.length >= 2, `${file}: contextual inquiry links missing`);
    for (const url of inquiryLinks) {
      assert.equal(url.pathname, "christian.g.callahan@cgclabs.org");
      assert.ok(url.searchParams.get("subject"));
      const body = url.searchParams.get("body");
      assert.ok(body, `${file}: email prompts missing`);
      for (const prompt of ["Sources:", "Goal:", "Timeline:"]) assert.ok(body.includes(prompt), `${file}: ${prompt} prompt missing`);
    }
  });
}
