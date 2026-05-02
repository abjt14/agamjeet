import { NextRequest, NextResponse } from "next/server";
import { redis } from "@/lib/redis";
import { ratelimit, getClientIp } from "@/lib/ratelimit";

const MAX_SLUG_LENGTH = 191;
const SLUG_PATTERN = /^[a-zA-Z0-9_\-/.]+$/;
const DOWNLOAD_TYPES = ["problems", "answer-key"] as const;
type DownloadType = (typeof DOWNLOAD_TYPES)[number];

function isValidSlug(slug: string | null): slug is string {
  return !!slug && slug.length <= MAX_SLUG_LENGTH && SLUG_PATTERN.test(slug);
}

function isValidType(type: string | null): type is DownloadType {
  return type !== null && (DOWNLOAD_TYPES as readonly string[]).includes(type);
}

export async function GET(req: NextRequest) {
  try {
    const slug = req.nextUrl.searchParams.get("slug");
    const type = req.nextUrl.searchParams.get("type");

    if (!slug) {
      const total = (await redis.get<number>("downloads:total")) ?? 0;
      return NextResponse.json({ downloads: total }, { status: 200 });
    }

    if (!isValidSlug(slug)) {
      return NextResponse.json({ message: "Invalid slug" }, { status: 400 });
    }

    if (!isValidType(type)) {
      return NextResponse.json(
        { message: "Invalid or missing type" },
        { status: 400 }
      );
    }

    const count = (await redis.get<number>(`downloads:${slug}:${type}`)) ?? 0;
    return NextResponse.json({ downloads: count, type }, { status: 200 });
  } catch (e) {
    console.error("GET /downloads", e);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const slug = req.nextUrl.searchParams.get("slug");
    const type = req.nextUrl.searchParams.get("type");

    if (!isValidSlug(slug)) {
      return NextResponse.json({ message: "Invalid slug" }, { status: 400 });
    }

    if (!isValidType(type)) {
      return NextResponse.json(
        { message: "Invalid or missing type" },
        { status: 400 }
      );
    }

    const { success, reset } = await ratelimit.limit(
      `downloads:${getClientIp(req)}`
    );
    if (!success) {
      return NextResponse.json(
        { message: "Too many requests" },
        {
          status: 429,
          headers: { "Retry-After": String(Math.ceil((reset - Date.now()) / 1000)) },
        }
      );
    }

    const [count] = await redis
      .multi()
      .incr(`downloads:${slug}:${type}`)
      .incr("downloads:total")
      .exec<[number, number]>();

    return NextResponse.json({ downloads: count, type }, { status: 200 });
  } catch (e) {
    console.error("POST /downloads", e);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
