import { NextRequest, NextResponse } from "next/server";
import { redis } from "@/lib/redis";
import { ratelimit, getClientIp } from "@/lib/ratelimit";

const MAX_SLUG_LENGTH = 191;
const SLUG_PATTERN = /^[a-zA-Z0-9_\-/.]+$/;

function isValidSlug(slug: string | null): slug is string {
  return !!slug && slug.length <= MAX_SLUG_LENGTH && SLUG_PATTERN.test(slug);
}

export async function GET(req: NextRequest) {
  try {
    const slug = req.nextUrl.searchParams.get("slug");

    if (slug === null) {
      const total = (await redis.get<number>("views:total")) ?? 0;
      return NextResponse.json({ views: total }, { status: 200 });
    }

    if (!isValidSlug(slug)) {
      return NextResponse.json({ message: "Invalid slug" }, { status: 400 });
    }

    const count = (await redis.get<number>(`views:${slug}`)) ?? 0;
    return NextResponse.json({ views: count }, { status: 200 });
  } catch (e) {
    console.error("GET /views", e);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const slug = req.nextUrl.searchParams.get("slug");

    if (!isValidSlug(slug)) {
      return NextResponse.json({ message: "Invalid slug" }, { status: 400 });
    }

    const { success, reset } = await ratelimit.limit(`views:${getClientIp(req)}`);
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
      .incr(`views:${slug}`)
      .incr("views:total")
      .exec<[number, number]>();

    return NextResponse.json({ views: count }, { status: 200 });
  } catch (e) {
    console.error("POST /views", e);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
