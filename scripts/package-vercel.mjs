import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const dist = new URL("../dist/", import.meta.url);
const output = new URL("../.vercel/output/", import.meta.url);
// Fail before touching the previous package if the build is missing.
await readFile(new URL("index.html", dist));
await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
await cp(dist, new URL("static/", output), { recursive: true });
await writeFile(
  new URL("config.json", output),
  JSON.stringify(
    {
      version: 3,
      routes: [
        {
          src: "/(.*)",
          headers: {
            "X-Content-Type-Options": "nosniff",
            "X-Frame-Options": "DENY",
            "Referrer-Policy": "strict-origin-when-cross-origin",
          },
          continue: true,
        },
        {
          src: "/assets/(.*)",
          headers: { "Cache-Control": "public, max-age=31536000, immutable" },
          continue: true,
        },
        {
          src: "/index.html",
          headers: { "Cache-Control": "public, max-age=0, must-revalidate" },
          continue: true,
        },
        { handle: "filesystem" },
      ],
    },
    null,
    2,
  ) + "\n",
);
console.log(`Packaged the verified static build at ${fileURLToPath(output)}`);
