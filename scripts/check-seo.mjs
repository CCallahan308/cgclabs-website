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
  });
}

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
