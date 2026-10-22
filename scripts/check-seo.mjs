import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const origin = "https://cgclabs.org";
const pages = new Map([
  ["index.html", "/"],
  ["data-engineering.html", "/data-engineering"],
  ["analytics.html", "/analytics"],
  ["website.html", "/website"],
  ["privacy.html", "/privacy"],
  ["cookies.html", "/cookies"],
]);
const read = (file) => readFileSync(resolve(root, file), "utf8");
const decodeEntities = (value) => value
  .replaceAll("&amp;", "&")
  .replaceAll("&quot;", '"')
  .replaceAll("&#39;", "'")
  .replaceAll("&apos;", "'")
  .replaceAll("&lt;", "<")
  .replaceAll("&gt;", ">");
const visibleText = (html) => decodeEntities(html
  .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "")
  .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, "")
  .replace(/<[^>]+>/g, " ")
  .replaceAll("&nbsp;", " "))
  .replace(/\s+/g, " ")
  .trim();
const schema = (file) => {
  const blocks = [...read(file).matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  assert.equal(blocks.length, 1, `${file}: expected one structured data block`);
  return JSON.parse(blocks[0][1]);
};

for (const [file, path] of pages) {
  test(`${file}: canonical, social URL, metadata, and heading`, () => {
    const html = read(file);
    assert.equal(html.match(/<link rel="canonical" href="([^"]+)"/)?.[1], origin + path);
    assert.equal(html.match(/<meta property="og:url" content="([^"]+)"/)?.[1], origin + path);
    assert.match(html, /<title>[^<]+<\/title>/);
    assert.match(html, /<meta name="description" content="[^"]+"/);
    assert.equal([...html.matchAll(/<h1\b/g)].length, 1);
    assert.doesNotMatch(html, /<meta[^>]+(?:noindex|nofollow)/i);
    const page = schema(file)["@graph"]?.find((node) => node["@type"] === "WebPage");
    assert.ok(page, `${file}: WebPage structured data missing`);
    assert.equal(page.url, origin + path);
    assert.equal(page.name, decodeEntities(html.match(/<title>([^<]+)<\/title>/)[1]));
    assert.equal(page.description, decodeEntities(html.match(/<meta name="description" content="([^"]+)"/)[1]));
  });
}

test("each public page has a distinct title and description", () => {
  const titles = [];
  const descriptions = [];
  for (const [file] of pages) {
    const html = read(file);
    titles.push(decodeEntities(html.match(/<title>([^<]+)<\/title>/)?.[1] ?? "").trim());
    descriptions.push(decodeEntities(html.match(/<meta name="description" content="([^"]+)"/)?.[1] ?? "").trim());
  }
  assert.ok(titles.every(Boolean));
  assert.ok(descriptions.every(Boolean));
  assert.equal(new Set(titles).size, pages.size);
  assert.equal(new Set(descriptions).size, pages.size);
});

test("published bookmark targets remain available and IDs are unique", () => {
  const bookmarks = new Map([
    ["index.html", ["practices", "method", "operator"]],
    ["data-engineering.html", ["work", "standard"]],
    ["analytics.html", ["deliver", "method", "proof", "pricing", "firms"]],
    ["website.html", ["build", "own"]],
  ]);
  for (const [file] of pages) {
    const ids = [...read(file).matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]);
    assert.equal(new Set(ids).size, ids.length, `${file}: duplicate ID makes bookmark behavior ambiguous`);
    for (const id of ["main", "drawer", ...(bookmarks.get(file) ?? [])]) {
      assert.ok(ids.includes(id), `${file}: published #${id} bookmark removed`);
    }
  }
});

test("analytics retains its diagnostic and retainer prices and payment terms", () => {
  const text = visibleText(read("analytics.html"));
  assert.match(text, /\$\s*8,500\b/);
  assert.match(text, /30-Day Diagnostic/i);
  assert.match(text, /\$\s*15,000\s*\/mo\b/);
  assert.match(text, /Credited in full against month 1 of a retainer signed within 90 days\./i);
  assert.match(text, /No initiation fee\./i);
  assert.match(text, /One-month initial term, then month-to-month with 30 days notice\./i);
  for (const [file] of pages) {
    if (file !== "analytics.html") assert.doesNotMatch(visibleText(read(file)), /\$\s*\d/, `${file}: price outside analytics`);
  }
});

test("historical outcome figures retain their original work context", () => {
  const engineering = visibleText(read("data-engineering.html"));
  assert.match(engineering, /a rural Critical Access Hospital in the Midwestern US/i);
  assert.match(engineering, /\b200\s*\+/);
  assert.match(engineering, /\b(?:4\s*(?:years?|yr)|four years)\b/i);
  assert.match(engineering, /\b(?:0|zero)\s+missed\b/i);
  assert.match(engineering, /Veradigm/i);
  assert.match(engineering, /Paragon/i);
  assert.match(engineering, /Altera/i);
  const analytics = visibleText(read("analytics.html"));
  assert.match(analytics, /a rural Critical Access Hospital in the Midwestern US/i);
  assert.match(analytics, /\b22(?:\s*(?:point|pt)|-point)\b/i);
  assert.match(analytics, /\b(?:eleven|11) months\b/i);
  assert.match(analytics, /\b75\s*th\b/i);
  assert.match(analytics, /\$\s*(?:150,000|150\s*K)\b/i);
  assert.match(analytics, /\$\s*(?:10,000|10\s*K)\b/i);
  assert.match(analytics, /\b200\s*\+/);
});

test("robots advertises the sitemap and allows public crawling", () => {
  const robots = read("robots.txt");
  assert.match(robots, /^User-agent: \*$/m);
  assert.match(robots, /^Allow: \/$/m);
  assert.match(robots, /^Sitemap: https:\/\/cgclabs\.org\/sitemap\.xml$/m);
  assert.doesNotMatch(robots, /^Disallow:\s*\//m);
});

test("sitemap lists each canonical public URL once", () => {
  const xml = read("sitemap.xml");
  assert.match(xml, /<urlset xmlns="http:\/\/www\.sitemaps\.org\/schemas\/sitemap\/0\.9">/);
  const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
  assert.deepEqual(urls.sort(), [...pages.values()].map((path) => origin + path).sort());
});

test("organization, website, and service structured data agree", () => {
  const home = schema("index.html");
  assert.equal(home["@context"], "https://schema.org");
  const organization = home["@graph"].find((node) => node["@type"] === "Organization");
  const website = home["@graph"].find((node) => node["@type"] === "WebSite");
  assert.equal(organization["@id"], origin + "/#organization");
  assert.equal(organization.url, origin + "/");
  assert.equal(website.publisher["@id"], organization["@id"]);
  const serviceSchema = schema("data-engineering.html");
  assert.equal(serviceSchema["@context"], "https://schema.org");
  const service = serviceSchema["@graph"]?.find((node) => node["@type"] === "Service") ?? serviceSchema;
  assert.equal(service["@type"], "Service");
  assert.equal(service.url, origin + pages.get("data-engineering.html"));
  assert.equal(service.provider["@id"], organization["@id"]);
});

test("analytics provides contextual product and metric-definition links", () => {
  const html = read("analytics.html");
  assert.match(html, /href="https:\/\/measuremap\.cgclabs\.org\/"/);
  assert.match(html, /href="https:\/\/measuremap\.cgclabs\.org\/#product"/);
});

test("local links, resources, and fragment targets exist", () => {
  for (const [file] of pages) {
    for (const match of read(file).matchAll(/(?:href|src)="([^"]+)"/g)) {
      const raw = match[1];
      if (/^[a-z][a-z0-9+.-]*:/i.test(raw) || raw.startsWith("//")) continue;
      const target = new URL(raw, `${origin}/${file}`);
      const path = decodeURIComponent(target.pathname);
      const targetFile = path === "/" ? "index.html" : path.slice(1);
      const resolvedFile = existsSync(resolve(root, targetFile)) ? targetFile : `${targetFile}.html`;
      assert.ok(existsSync(resolve(root, resolvedFile)), `${file}: missing target ${raw}`);
      if (target.hash) {
        const id = decodeURIComponent(target.hash.slice(1));
        assert.ok([...read(resolvedFile).matchAll(/\bid="([^"]+)"/g)].some((entry) => entry[1] === id), `${file}: missing fragment ${raw}`);
      }
    }
  }
});
