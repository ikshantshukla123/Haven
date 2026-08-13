/* eslint-disable no-console */
// One-time migration script: converts legacy client images to WebP and uploads
// them to the Supabase storage bucket.
//
// Usage: node --env-file=.env scripts/upload-images.mjs
//
// Requires a local `cwebp` binary (available on macOS via `brew install webp`).
import { execSync } from "node:child_process";
import { mkdirSync, readdirSync, readFileSync } from "node:fs";
import { basename, join } from "node:path";
import { tmpdir } from "node:os";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const BUCKET = process.env.NEXT_PUBLIC_SUPABASE_BUCKET || "hamper-haven";

if (!SUPABASE_URL || !SERVICE_KEY) {
  console.error("Missing Supabase env vars in .env");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SERVICE_KEY, {
  auth: { persistSession: false },
});

const LEGACY_PUBLIC = new URL("../legacy/client/public", import.meta.url).pathname;

// Map of local file -> storage path (without extension, .webp appended)
const JOBS = [
  ...readdirSync(join(LEGACY_PUBLIC, "photos"))
    .filter((f) => f.endsWith(".jpeg"))
    .map((f) => ({ src: join(LEGACY_PUBLIC, "photos", f), dest: `site/${basename(f, ".jpeg")}` })),
  { src: join(LEGACY_PUBLIC, "abhi.jpeg"), dest: "brand/logo" },
  { src: join(LEGACY_PUBLIC, "abhijay.jpeg"), dest: "team/abhijay" },
  { src: join(LEGACY_PUBLIC, "pratyush.jpeg"), dest: "team/pratyush" },
  { src: join(LEGACY_PUBLIC, "kavita.jpeg"), dest: "team/kavita" },
];

const WORK = join(tmpdir(), "haven-webp");
mkdirSync(WORK, { recursive: true });

async function upload(path, bytes, contentType) {
  const { error } = await supabase.storage.from(BUCKET).upload(path, bytes, {
    contentType,
    cacheControl: "31536000",
    upsert: true,
  });
  if (error) {
    console.error(`Upload failed for ${path}: ${error.message}`);
    return false;
  }
  return true;
}

async function main() {
  let ok = 0;
  let failed = 0;

  for (const job of JOBS) {
    const out = join(WORK, `${job.dest.split("/").join("-")}.webp`);
    try {
      execSync(`cwebp -q 80 "${job.src}" -o "${out}"`, { stdio: "pipe" });
      const bytes = readFileSync(out);
      const good = await upload(`${job.dest}.webp`, bytes, "image/webp");
      if (good) {
        console.log(`OK  ${job.dest}.webp (${(bytes.length / 1024).toFixed(1)} KB)`);
        ok++;
      } else {
        failed++;
      }
    } catch (err) {
      console.error(`Failed converting ${job.src}: ${err.message}`);
      failed++;
    }
  }

  console.log(`\nDone: ${ok} uploaded, ${failed} failed`);
}

main();