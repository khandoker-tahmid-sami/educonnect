import { replaceMongoIdInArray } from "@/lib/convertData";
import { Course } from "@/model/course-model";
import { Enrollment } from "@/model/enrollment-model";
import { dbConnect } from "@/service/connectMongo";

export const getEnrollmentsForCourse = async (courseId) => {
  await dbConnect();
  const enrollments = await Enrollment.find({ course: courseId }).lean();

  return replaceMongoIdInArray(enrollments);
};

export const getEnrollmentsForUser = async (userId) => {
  try {
    await dbConnect();
    const enrollments = await Enrollment.find({ student: userId })
      .populate({
        path: "course",
        model: Course,
      })
      .lean();

    return replaceMongoIdInArray(enrollments);
  } catch (error) {
    throw new Error(error);
  }
};

export const createEnrollmentForCourse = async (
  courseId,
  studentId,
  paymentMethod
) => {
  await dbConnect();
  const newEnrollment = {
    course: courseId,
    student: studentId,
    method: paymentMethod,
    enrollment_date: Date.now(),
    status: "not-started",
  };

  try {
    const response = await Enrollment.create(newEnrollment);
    return response;
  } catch (e) {
    throw new Error(e);
  }
};
