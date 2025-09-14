import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const revalidate = 60;

const mapType = (t: "problems" | "answer-key") => (t === "problems" ? 1 : 2);

export async function GET(req: NextRequest) {
  try {
    const slug = req.nextUrl.searchParams.get("slug");
    const type = req.nextUrl.searchParams.get("type") as
      | "problems"
      | "answer-key"
      | null;

    if (!slug) {
      const total = await prisma.downloads.aggregate({ _sum: { count: true } });
      return NextResponse.json(
        { downloads: total._sum.count ?? 0 },
        { status: 200 }
      );
    }

    if (!type) {
      return NextResponse.json(
        { message: "Download type is required" },
        { status: 400 }
      );
    }

    const row = await prisma.downloads.findUnique({
      where: { downloadsId: { articleslug: slug, type: mapType(type) } },
      select: { count: true },
    });

    return NextResponse.json(
      { downloads: row?.count ?? 0, type },
      { status: 200 }
    );
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
    const type = req.nextUrl.searchParams.get("type") as
      | "problems"
      | "answer-key"
      | null;

    if (!slug)
      return NextResponse.json(
        { message: "Article slug is required" },
        { status: 400 }
      );
    if (!type)
      return NextResponse.json(
        { message: "Download type is required" },
        { status: 400 }
      );

    const updated = await prisma.downloads.upsert({
      where: { downloadsId: { articleslug: slug, type: mapType(type) } },
      create: { articleslug: slug, type: mapType(type), count: 1 },
      update: { count: { increment: 1 } },
    });

    const { revalidateTag } = await import("next/cache");
    revalidateTag("downloads");
    revalidateTag(`downloads:${slug}`);
    revalidateTag(`downloads:${slug}:${type}`);

    return NextResponse.json(
      { downloads: updated.count, type },
      { status: 200 }
    );
  } catch (e) {
    console.error("POST /downloads", e);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
