import {
  replaceMongoIdInArray,
  replaceMongoIdInObject,
} from "@/lib/convertData";
import { Category } from "@/model/category-model";
import { Course } from "@/model/course-model";
import { Module } from "@/model/module.model";
import { Testimonial } from "@/model/testimonial-model";
import { User } from "@/model/user-model";
import { dbConnect } from "@/service/connectMongo";
import { getEnrollmentsForCourse } from "./enrollments";
import { getTestimonialsForCourse } from "./testimonials";

export async function getCourseList() {
  await dbConnect();
  const courses = await Course.find({})
    .select([
      "title",
      "subtitle",
      "thumbnail",
      "modules",
      "price",
      "category",
      "instructor",
    ])
    .populate({
      path: "category",
      model: Category,
    })
    .populate({
      path: "instructor",
      model: User,
    })
    .populate({
      path: "testimonials",
      model: Testimonial,
    })
    .populate({
      path: "modules",
      model: Module,
    })
    .lean();
  return replaceMongoIdInArray(courses);
}

export const getCourseById = async (id) => {
  await dbConnect();
  const course = await Course.findById(id)
    .populate({
      path: "category",
      model: Category,
    })
    .populate({
      path: "instructor",
      model: User,
    })
    .populate({
      path: "testimonials",
      model: Testimonial,
      populate: {
        path: "user",
        model: User,
      },
    })
    .populate({
      path: "modules",
      model: Module,
    })
    .lean();
  return replaceMongoIdInObject(course);
};

export const getCourseDetailsByInstructor = async (instructorId) => {
  await dbConnect();

  const courses = await Course.find({ instructor: instructorId }).lean();

  const enrollments = await Promise.all(
    courses.map(async (course) => {
      const enrollment = await getEnrollmentsForCourse(course._id.toString());
      return enrollment;
    })
  );

  // console.log(enrollments);

  // const totalEnrollments = enrollments.flat().length;
  const totalEnrollments = enrollments.reduce(
    (item, currentValue) => item + currentValue.length,
    0
  );

  // console.log(totalEnrollments);

  const testimonials = await Promise.all(
    courses.map(async (course) => {
      const testimonial = await getTestimonialsForCourse(course._id.toString());
      return testimonial;
    })
  );

  // console.log(testimonials);

  const totalTestimonials = testimonials.flat();

  const averageSum = totalTestimonials.reduce((acc, obj) => {
    return acc + obj.rating;
  }, 0);

  const averageRating = totalTestimonials.length
    ? averageSum / totalTestimonials.length
    : 0;

  const avgratingToFix =
    averageRating === 0 ? averageRating : averageRating.toFixed(1);
  // console.log(totalTestimonials, averageRating);

  return {
    courses: courses.length,
    enrollments: totalEnrollments,
    testimonials: totalTestimonials.length,
    ratings: avgratingToFix,
  };
};
