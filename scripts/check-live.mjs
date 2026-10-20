import assert from "node:assert/strict";

const base = new URL(process.env.DEPLOYMENT_URL);
assert.equal(base.protocol, "https:");
async function get(path) {
  // A deployed URL should already be ready. Retry brief CDN propagation delays.
  for (let attempt = 0; attempt < 3; attempt++) {
    const response = await fetch(new URL(path, base), {
      signal: AbortSignal.timeout(20000),
    });
    if (response.ok) return response;
    if (attempt === 2)
      throw new Error(
        `Public deployment check failed: ${path} returned ${response.status}. Check deployment access in Vercel.`,
      );
    await new Promise((resolve) => setTimeout(resolve, 2000));
  }
}
const response = await get("/");
assert.match(response.headers.get("content-type") || "", /text\/html/);
const html = await response.text();
assert.match(html, /Phonehaus/);
assert.match(html, /<div id="root"><\/div>/);
const assets = [...html.matchAll(/(?:src|href)="(\/assets\/[^"?#]+)"/g)].map(
  (match) => match[1],
);
assert.ok(assets.some((path) => path.endsWith(".js")));
assert.ok(assets.some((path) => path.endsWith(".css")));
for (const path of [...assets, "/phones/iphone-pro.svg", "/phones/redmi.svg"]) {
  const asset = await get(path);
  const contentType = asset.headers.get("content-type") || "";
  assert.doesNotMatch(
    contentType,
    /text\/html/,
    `Asset returned an HTML error page: ${path}`,
  );
  assert.ok(
    (await asset.arrayBuffer()).byteLength > 0,
    `Empty deployed asset: ${path}`,
  );
}
console.log(
  `Public HTTPS entry point, compiled assets, and sample images verified: ${base.origin}`,
);
