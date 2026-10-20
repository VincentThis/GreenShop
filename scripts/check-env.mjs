import { loadEnv } from "vite";

const env = {
  ...loadEnv("production", process.cwd(), "VITE_"),
  ...process.env,
};
const enabled = env.VITE_ENABLE_SUPABASE ?? "false";
if (!["true", "false"].includes(enabled)) {
  throw new Error("VITE_ENABLE_SUPABASE must be true or false.");
}
if (enabled === "true") {
  let url;
  try {
    url = new URL(env.VITE_SUPABASE_URL);
  } catch {
    throw new Error("Set VITE_SUPABASE_URL before enabling Supabase.");
  }
  if (url.protocol !== "https:" || url.hostname === "preview.supabase.co") {
    throw new Error("Use the HTTPS URL of your new Supabase project.");
  }
  const key = env.VITE_SUPABASE_PUBLISHABLE_KEY || "";
  let isAnonKey = false;
  try {
    isAnonKey =
      JSON.parse(Buffer.from(key.split(".")[1], "base64url").toString())
        .role === "anon";
  } catch {
    /* Modern publishable keys do not contain a JWT payload. */
  }
  if (!key.startsWith("sb_publishable_") && !isAnonKey) {
    throw new Error(
      "Use a Supabase browser publishable key or legacy anon key, never a service-role or secret key.",
    );
  }
}
console.log(
  `Build configuration verified. Supabase: ${enabled === "true" ? "enabled" : "disabled (catalogue demo)"}.`,
);
