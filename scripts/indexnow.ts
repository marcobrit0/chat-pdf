/**
 * IndexNow submitter.
 *
 * Reads the production sitemap, extracts <loc> URLs, and POSTs them to
 * api.indexnow.org so Bing/Yandex/Naver/Seznam re-crawl them quickly.
 * Google does not participate in IndexNow.
 *
 * Usage:
 *   npx tsx scripts/indexnow.ts
 *   npx tsx scripts/indexnow.ts --dry-run
 *   npx tsx scripts/indexnow.ts --sitemap https://www.example.com/sitemap.xml
 *
 * Required env:
 *   INDEXNOW_KEY        the key (must match public/<KEY>.txt)
 *   INDEXNOW_HOST       host without scheme, e.g. www.pdfia.com.br
 *
 * Optional env:
 *   INDEXNOW_SITEMAP    default sitemap URL (falls back to https://<host>/sitemap.xml)
 */

const KEY = process.env.INDEXNOW_KEY;
const HOST = process.env.INDEXNOW_HOST;

if (!KEY || !HOST) {
  console.error("Missing INDEXNOW_KEY or INDEXNOW_HOST env vars.");
  process.exit(1);
}

const args = process.argv.slice(2);
const dryRun = args.includes("--dry-run");
const sitemapIdx = args.indexOf("--sitemap");
const sitemap =
  sitemapIdx >= 0 ? args[sitemapIdx + 1] : process.env.INDEXNOW_SITEMAP ?? `https://${HOST}/sitemap.xml`;

async function fetchUrls(sitemapUrl: string): Promise<string[]> {
  const res = await fetch(sitemapUrl);
  if (!res.ok) throw new Error(`Sitemap ${sitemapUrl} → ${res.status}`);
  const xml = await res.text();
  if (xml.includes("<sitemapindex")) {
    const children = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
    const all: string[] = [];
    for (const child of children) all.push(...(await fetchUrls(child)));
    return all;
  }
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
}

async function submit(urls: string[]) {
  const keyLocation = `https://${HOST}/${KEY}.txt`;
  const body = { host: HOST, key: KEY, keyLocation, urlList: urls };
  if (dryRun) {
    console.log("DRY RUN — would POST to api.indexnow.org:");
    console.log(JSON.stringify(body, null, 2));
    return;
  }
  const res = await fetch("https://api.indexnow.org/IndexNow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(body),
  });
  const text = await res.text();
  console.log(`IndexNow → HTTP ${res.status} ${res.statusText}`);
  if (text) console.log(text);
  if (!res.ok) process.exit(1);
}

(async () => {
  console.log(`Sitemap: ${sitemap}`);
  const urls = await fetchUrls(sitemap);
  console.log(`URLs: ${urls.length}`);
  if (urls.length === 0) {
    console.error("No URLs found.");
    process.exit(1);
  }
  if (urls.length > 10000) {
    console.error(`IndexNow limit is 10,000 URLs per request. Found ${urls.length}.`);
    process.exit(1);
  }
  await submit(urls);
})();
