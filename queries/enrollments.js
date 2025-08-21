import { replaceMongoIdInArray } from "@/lib/convertData";
import { Enrollment } from "@/model/enrollment-model";
import { dbConnect } from "@/service/connectMongo";

export const getEnrollmentsForCourse = async (courseId) => {
  await dbConnect();
  const enrollments = await Enrollment.find({ course: courseId }).lean();

  return replaceMongoIdInArray(enrollments);
};
