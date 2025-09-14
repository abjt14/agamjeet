import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const revalidate = 60;

export async function GET(req: NextRequest) {
  try {
    const slug = req.nextUrl.searchParams.get("slug");
    if (!slug) {
      const total = await prisma.views.aggregate({ _sum: { count: true } });
      return NextResponse.json(
        { views: total._sum.count ?? 0 },
        { status: 200 }
      );
    }

    const row = await prisma.views.findUnique({
      where: { articleslug: slug },
      select: { count: true },
    });

    return NextResponse.json({ views: row?.count ?? 0 }, { status: 200 });
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
    if (!slug) {
      return NextResponse.json(
        { message: "Article slug is required" },
        { status: 400 }
      );
    }

    const updated = await prisma.views.upsert({
      where: { articleslug: slug },
      create: { articleslug: slug, count: 1 },
      update: { count: { increment: 1 } },
    });

    // Bust the cached GET
    const { revalidateTag } = await import("next/cache");
    revalidateTag("views"); // total endpoint if you add tags later
    revalidateTag(`views:${slug}`); // per-slug endpoint

    return NextResponse.json({ views: updated.count }, { status: 200 });
  } catch (e) {
    console.error("POST /views", e);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
