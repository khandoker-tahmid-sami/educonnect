import { NextResponse } from "next/server";
import { getCourseList } from "@/queries/courses";

export const runtime = "nodejs"; //Forces the route to run on Node.js runtime, not Edge.
export const dynamic = "force-dynamic"; //Tells Next.js not to cache this route at build time or via ISR.

export const GET = async () => {
  try {
    const courses = await getCourseList();
    return NextResponse.json({ success: true, data: courses }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { success: false, error: err?.message ?? "Internal Server Error" },
      { status: 500 }
    );
  }
};
