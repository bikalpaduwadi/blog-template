import { NextRequest, NextResponse } from "next/server";

import prisma from "@/app/utils/connect";
import { getAuthSession } from "@/app/utils/auth";

// Get all comments of a post
export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);

  const postSlug = searchParams.get("postSlug") || "";

  try {
    const comments = await prisma.comment.findMany({
      where: { ...(postSlug && { postSlug }) },
    });

    return new NextResponse(JSON.stringify(comments), { status: 200 });
  } catch (error) {
    console.log(error);

    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }),
      { status: 500 }
    );
  }
};

// Create a comment
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
    const comment = await prisma.comment.create({
      data: { ...body, userEmail: session.user?.email },
    });

    return new NextResponse(JSON.stringify(comment), { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }),
      { status: 500 }
    );
  }
};
