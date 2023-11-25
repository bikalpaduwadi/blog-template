import { NextRequest, NextResponse } from "next/server";

import prisma from "@/app/utils/connect";
import { getAuthSession } from "@/app/utils/auth";

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const page = searchParams?.get("page") || 1;
  const categoryName = searchParams?.get("categoryName") || "";

  const POSTS_PER_PAGE = 2;

  const query = {
    take: POSTS_PER_PAGE,
    skip: POSTS_PER_PAGE * (+page - 1),
    where: {
      ...(categoryName && { categorySlug: categoryName }),
    },
  };

  try {
    const [posts, count] = await prisma.$transaction([
      prisma.post.findMany(query),
      prisma.post.count({ where: query.where }),
    ]);

    return new NextResponse(JSON.stringify({ posts, count }), { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }),
      { status: 500 }
    );
  }
};

// Create a post
export const POST = async (req: NextRequest) => {
  const session = await getAuthSession();

  if (!session) {
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong" }),
      { status: 401 }
    );
  }

  try {
    const body = await req.json();
    const post = await prisma.post.create({
      data: { ...body, userEmail: session.user?.email },
    });

    return new NextResponse(JSON.stringify(post), { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }),
      { status: 500 }
    );
  }
};
