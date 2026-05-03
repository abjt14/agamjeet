import { NextRequest, NextResponse } from "next/server";
import { redis } from "@/lib/redis";
import { ratelimit, getClientIp } from "@/lib/ratelimit";
import { isValidSlug } from "@/lib/slug";
import { isValidDownloadType } from "@/lib/download-types";
import { serverError } from "@/lib/api";

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

    if (!isValidDownloadType(type)) {
      return NextResponse.json(
        { message: "Invalid or missing type" },
        { status: 400 }
      );
    }

    const count = (await redis.get<number>(`downloads:${slug}:${type}`)) ?? 0;
    return NextResponse.json({ downloads: count, type }, { status: 200 });
  } catch (e) {
    return serverError("GET /downloads", e);
  }
}

export async function POST(req: NextRequest) {
  try {
    const slug = req.nextUrl.searchParams.get("slug");
    const type = req.nextUrl.searchParams.get("type");

    if (!isValidSlug(slug)) {
      return NextResponse.json({ message: "Invalid slug" }, { status: 400 });
    }

    if (!isValidDownloadType(type)) {
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
    return serverError("POST /downloads", e);
  }
}
