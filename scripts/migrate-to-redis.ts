// One-shot: copy view/download counts from Supabase (Prisma) to Upstash Redis.
// Run with: npx tsx scripts/migrate-to-redis.ts
// Requires DATABASE_URL, DIRECT_URL, UPSTASH_REDIS_REST_URL, UPSTASH_REDIS_REST_TOKEN in .env.local.

import { config } from "dotenv";
config({ path: ".env.local" });

import { PrismaClient } from "@prisma/client";
import { Redis } from "@upstash/redis";

const prisma = new PrismaClient();
const redis = Redis.fromEnv();

const TYPE_INT_TO_STRING: Record<number, "problems" | "answer-key"> = {
  1: "problems",
  2: "answer-key",
};

async function main() {
  console.log("Reading from Supabase...");
  const [views, downloads] = await Promise.all([
    prisma.views.findMany(),
    prisma.downloads.findMany(),
  ]);
  console.log(`  views rows: ${views.length}`);
  console.log(`  downloads rows: ${downloads.length}`);

  const viewsTotal = views.reduce((sum, r) => sum + r.count, 0);
  const downloadsTotal = downloads.reduce((sum, r) => sum + r.count, 0);
  console.log(`  views total: ${viewsTotal}`);
  console.log(`  downloads total: ${downloadsTotal}`);

  console.log("Writing to Upstash...");
  const pipeline = redis.multi();
  for (const row of views) {
    pipeline.set(`views:${row.articleslug}`, row.count);
  }
  for (const row of downloads) {
    const typeStr = TYPE_INT_TO_STRING[row.type];
    if (!typeStr) {
      console.warn(`  skipping unknown type=${row.type} for ${row.articleslug}`);
      continue;
    }
    pipeline.set(`downloads:${row.articleslug}:${typeStr}`, row.count);
  }
  pipeline.set("views:total", viewsTotal);
  pipeline.set("downloads:total", downloadsTotal);
  await pipeline.exec();

  console.log("Verifying...");
  const [verifyViewsTotal, verifyDownloadsTotal] = await Promise.all([
    redis.get<number>("views:total"),
    redis.get<number>("downloads:total"),
  ]);
  console.log(`  Upstash views:total = ${verifyViewsTotal}`);
  console.log(`  Upstash downloads:total = ${verifyDownloadsTotal}`);

  if (verifyViewsTotal !== viewsTotal || verifyDownloadsTotal !== downloadsTotal) {
    throw new Error("Totals mismatch — investigate before deploying.");
  }

  console.log("Done.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
