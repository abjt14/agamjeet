import { NextRequest, NextResponse } from "next/server";
import { redis } from "@/lib/redis";
import { ratelimit, getClientIp } from "@/lib/ratelimit";
import { isValidSlug } from "@/lib/slug";
import { serverError } from "@/lib/api";

export async function GET(req: NextRequest) {
  try {
    const slug = req.nextUrl.searchParams.get("slug");

    if (!slug) {
      const total = (await redis.get<number>("views:total")) ?? 0;
      return NextResponse.json({ views: total }, { status: 200 });
    }

    if (!isValidSlug(slug)) {
      return NextResponse.json({ message: "Invalid slug" }, { status: 400 });
    }

    const count = (await redis.get<number>(`views:${slug}`)) ?? 0;
    return NextResponse.json({ views: count }, { status: 200 });
  } catch (e) {
    return serverError("GET /views", e);
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
    return serverError("POST /views", e);
  }
}
