import { NextResponse } from "next/server";
import { allArticles } from "contentlayer/generated";
import { redis } from "@/lib/redis";
import { serverError } from "@/lib/api";
import type { DownloadType } from "@/lib/download-types";

type Counts = Partial<Record<DownloadType, number>>;

export async function GET() {
  try {
    const mockTests = allArticles.filter((a) => a.category === "mock-test");

    const requests: Array<{ slug: string; type: DownloadType }> = [];
    for (const a of mockTests) {
      requests.push({ slug: a.slug, type: "problems" });
      if (a.answerKey) requests.push({ slug: a.slug, type: "answer-key" });
    }

    const keys = [
      "downloads:total",
      ...requests.map((r) => `downloads:${r.slug}:${r.type}`),
    ];
    const values = await redis.mget<(number | null)[]>(...keys);

    const total = values[0] ?? 0;
    const byslug: Record<string, Counts> = {};
    requests.forEach((r, i) => {
      const v = values[i + 1] ?? 0;
      (byslug[r.slug] ??= {})[r.type] = v;
    });

    return NextResponse.json({ total, byslug }, { status: 200 });
  } catch (e) {
    return serverError("GET /downloads/all", e);
  }
}
