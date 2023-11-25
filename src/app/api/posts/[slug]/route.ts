import { NextRequest, NextResponse } from "next/server";

import prisma from "@/app/utils/connect";

// Get single post
export const GET = async (req: NextRequest, context: any) => {
  const { params } = context;
  const { slug } = params;

  try {
    const post = await prisma.post.findUnique({
      where: { slug },
      include: { user: true },
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
