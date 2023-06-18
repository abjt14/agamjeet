import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(
  req: NextRequest,
) {
  try {
    const slug = req.nextUrl.searchParams.get('slug');

    if (!slug) {
      return NextResponse.json({
        message: 'Slug is required.'
      },{
        status: 500
      })
    }

    const views = await prisma.views.findUnique({
      where: {
        articleSlug: slug
      },
      select: {
        count: true
      }
    });

    return NextResponse.json({
      views: views ?? 0
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

    if (!slug) {
      return NextResponse.json({
        message: 'Slug is required.'
      },{
        status: 500
      })
    }

    const article = await prisma.articles.findUnique({
      where: {
        slug
      }
    });

    if (!article) {
      await addArticle(slug);
      await addView(slug);
    }

    const views = await updateView(slug);

    return NextResponse.json({
      views: views
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

function addArticle(slug: string) {
  return prisma.articles.create({
    data: {
      slug,
    },
  });
}

function addView(slug: string) {
  return prisma.views.create({
    data: {
      articleSlug: slug,
    },
  });
}

function updateView(slug: string) {
  return prisma.views.update({
    where: {
      articleSlug: slug,
    },
    data: {
      count: {
        increment: 1,
      },
    },
  });
}
