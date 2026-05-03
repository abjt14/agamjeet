import { NextResponse } from "next/server";
import { allArticles } from "contentlayer/generated";
import { redis } from "@/lib/redis";
import { serverError } from "@/lib/api";

export async function GET() {
  try {
    const slugs = allArticles.map((a) => a.slug);
    const keys = ["views:total", ...slugs.map((s) => `views:${s}`)];
    const values = await redis.mget<(number | null)[]>(...keys);

    const total = values[0] ?? 0;
    const byslug: Record<string, number> = {};
    slugs.forEach((slug, i) => {
      byslug[slug] = values[i + 1] ?? 0;
    });

    return NextResponse.json({ total, byslug }, { status: 200 });
  } catch (e) {
    return serverError("GET /views/all", e);
  }
}
