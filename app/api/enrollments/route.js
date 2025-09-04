import { createEnrollmentForCourse } from "@/queries/enrollments";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  try {
    const { courseId, studentId, paymentMethod } = await request.json();

    if (!courseId || !studentId) {
      return NextResponse.json(
        { success: false, error: "courseId and studentId is required" },
        { status: 400 }
      );
    }

    const enrollments = await createEnrollmentForCourse(
      courseId,
      studentId,
      paymentMethod
    );
    return NextResponse.json(
      { success: true, message: "enrollment is addedd to the database" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to create enrollment" },
      { status: 500 }
    );
  }
};
