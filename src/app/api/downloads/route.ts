import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(
  req: NextRequest,
) {
  try {
    const slug = req.nextUrl.searchParams.get('slug');
    const type = req.nextUrl.searchParams.get('type');

    if (!slug) {
      return NextResponse.json({
        message: 'Article slug is required.'
      },{
        status: 500
      })
    }

    if (!type) {
      return NextResponse.json({
        message: 'Download type is required.'
      },{
        status: 500
      })
    }

    const downloads = await prisma.downloads.findUnique({
      where: {
        downloadsId: {
          articleSlug: slug,
          type: type === 'problems' ? 1 : 2
        }
      },
      select: {
        count: true
      }
    });

    return NextResponse.json({
      downloads: downloads?.count ?? 0
    },{
      status: 200
    })
  } catch (error) {
    console.log('error', error);

    return NextResponse.json({
      message: 'Something went wrong.',
      error
    },{
      status: 500
    })
  }
}

export async function POST(
  req: NextRequest,
) {
  try {
    const slug = req.nextUrl.searchParams.get('slug');
    const type = req.nextUrl.searchParams.get('type');

    if (!slug) {
      return NextResponse.json({
        message: 'Article slug is required.'
      },{
        status: 500
      })
    }

    if (!type) {
      return NextResponse.json({
        message: 'Download type is required.'
      },{
        status: 500
      })
    }

    const updateDownloads = await prisma.downloads.upsert({
      where: {
        downloadsId: {
          articleSlug: slug,
          type: type === 'problems' ? 1 : 2
        }
      },
      create: {
        articleSlug: slug,
        type: type === 'problems' ? 1 : 2,
        count: 1
      },
      update: {
        count: {
          increment: 1,
        },
      },
    });

    return NextResponse.json({
      downloads: updateDownloads.count
    },{
      status: 200
    })

  } catch (error) {
    console.log('error', error);

    return NextResponse.json({
      message: 'Something went wrong.',
      error
    },{
      status: 500
    })
  }
}

interface HelperProps {
  slug: string;
  type: string;
}
