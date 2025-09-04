import { getCourseById } from "@/queries/courses";
import { isValidObjectId } from "mongoose";
import { NextResponse } from "next/server";

export const GET = async (_req, { params }) => {
  try {
    const { id } = await params;

    if (!isValidObjectId(id)) {
      return NextResponse.json(
        { success: false, error: "Invalid Course id" },
        { status: 400 }
      );
    }

    const course = await getCourseById(id);
    if (!course) {
      return NextResponse.json(
        { success: false, error: "Course not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, data: course }, { status: 200 });
  } catch (error) {
    console.error("GET /api/courses/[id] error:", error);
    return NextResponse.json(
      { success: false, error: error?.message ?? "Internal Server Error" },
      { status: 500 }
    );
  }
};
