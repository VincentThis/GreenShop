import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import test from "node:test";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const dist = new URL("../dist/", import.meta.url);
const packaged = new URL("../.vercel/output/", import.meta.url);

test("enabled backend rejects missing settings and privileged browser keys", () => {
  const script = fileURLToPath(
    new URL("../scripts/check-env.mjs", import.meta.url),
  );
  const run = (values) =>
    spawnSync(process.execPath, [script], {
      encoding: "utf8",
      env: { ...process.env, VITE_ENABLE_SUPABASE: "true", ...values },
    });
  const missing = run({
    VITE_SUPABASE_URL: "",
    VITE_SUPABASE_PUBLISHABLE_KEY: "",
  });
  assert.notEqual(missing.status, 0);
  assert.match(missing.stderr, /Set VITE_SUPABASE_URL/);
  const privileged = run({
    VITE_SUPABASE_URL: "https://example.supabase.co",
    VITE_SUPABASE_PUBLISHABLE_KEY: "sb_secret_test_only_not_a_real_key",
  });
  assert.notEqual(privileged.status, 0);
  assert.match(privileged.stderr, /never a service-role or secret key/);
});

test("production entry point references existing compiled scripts and styles", async () => {
  const html = await readFile(new URL("index.html", dist), "utf8");
  assert.match(html, /<div id="root"><\/div>/);
  assert.match(html, /Phonehaus/);
  assert.doesNotMatch(html, /\/src\/main\.tsx/);
  const assets = [...html.matchAll(/(?:src|href)="(\/assets\/[^"?#]+)"/g)].map(
    (match) => match[1],
  );
  assert.ok(
    assets.some((asset) => asset.endsWith(".js")),
    "Missing application JavaScript",
  );
  assert.ok(
    assets.some((asset) => asset.endsWith(".css")),
    "Missing application stylesheet",
  );
  for (const asset of assets) {
    assert.ok(
      (await readFile(new URL(asset.slice(1), dist))).length > 0,
      `Empty asset: ${asset}`,
    );
  }
});

test("every phone listing has a deployed illustration", async () => {
  const catalogue = await readFile(
    new URL("../src/data/phones.ts", import.meta.url),
    "utf8",
  );
  const images = [...catalogue.matchAll(/image:\s*"(\/phones\/[^"\s]+)"/g)].map(
    (match) => match[1],
  );
  assert.equal(images.length, 8);
  for (const image of images)
    assert.match(await readFile(new URL(image.slice(1), dist), "utf8"), /<svg/);
});

test("Vercel package contains exactly the tested static build and routing config", async () => {
  const config = JSON.parse(
    await readFile(new URL("config.json", packaged), "utf8"),
  );
  assert.equal(config.version, 3);
  assert.ok(config.routes.some((route) => route.handle === "filesystem"));
  async function compare(directory = "") {
    const entries = await readdir(new URL(directory, dist), {
      withFileTypes: true,
    });
    const packagedEntries = await readdir(
      new URL(`static/${directory}`, packaged),
    );
    assert.deepEqual(
      packagedEntries.sort(),
      entries.map((entry) => entry.name).sort(),
    );
    for (const entry of entries) {
      const name = `${directory}${entry.name}`;
      if (entry.isDirectory()) await compare(`${name}/`);
      else
        assert.deepEqual(
          await readFile(new URL(name, dist)),
          await readFile(new URL(`static/${name}`, packaged)),
          `Changed file: ${name}`,
        );
    }
  }
  await compare();
});
