import { replaceMongoIdInArray } from "@/lib/convertData";
import { Testimonial } from "@/model/testimonial-model";
import { dbConnect } from "@/service/connectMongo";

export const getTestimonialsForCourse = async (courseId) => {
  await dbConnect();
  const testimonials = await Testimonial.find({ courseId: courseId }).lean();
  return replaceMongoIdInArray(testimonials);
};
