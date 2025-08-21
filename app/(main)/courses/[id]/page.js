// import { CourseProgress } from "@/components/course-progress";
import { replaceMongoIdInArray } from "@/lib/convertData";
import CourseDetails from "./_components/CourseDetails";
import CourseDetailsIntro from "./_components/CourseDetailsIntro";
import RelatedCourse from "./_components/RelatedCourse";
import Testimonials from "./_components/Testimonials";
const courses = [
  {
    id: 1,
    title: "Design",
    thumbnail: "/assets/images/categories/design.jpg",
  },

  {
    id: 3,
    title: "Development",
    thumbnail: "/assets/images/categories/development.jpg",
  },
  {
    id: 4,
    title: "Marketing",
    thumbnail: "/assets/images/categories/marketing.jpg",
  },
  {
    id: 5,
    title: "IT & Software",
    thumbnail: "/assets/images/categories/it_software.jpg",
  },
  {
    id: 6,
    title: "Personal Development",
    thumbnail: "/assets/images/categories/personal_development.jpg",
  },
  {
    id: 7,
    title: "Business",
    thumbnail: "/assets/images/categories/business.jpg",
  },
  {
    id: 8,
    title: "Photography",
    thumbnail: "/assets/images/categories/photography.jpg",
  },
  {
    id: 9,
    title: "Music",
    thumbnail: "/assets/images/categories/music.jpg",
  },
];
const SingleCoursePage = async ({ params }) => {
  const { id } = await params;
  //   console.log(id);
  //   const course = await getCourseById(id);
  //   console.log(course);
  const base = process.env.NEXT_PUBLIC_APP_URL;
  const response = await fetch(`${base}/api/courses/${id}`);
  if (!response.ok) throw new Error("Failed to load course by id");

  const { data: course } = await response.json();
  //   console.log(course.testimonials);
  //   console.log(course);
  return (
    <>
      {/* course details introduction */}
      <CourseDetailsIntro
        title={course?.title}
        subtitle={course?.subtitle}
        thumbnail={course?.thumbnail}
      />

      {/* full course details */}
      <CourseDetails course={course} />

      {/* Testimonials */}
      {course?.testimonials && (
        <Testimonials
          testimonials={replaceMongoIdInArray(course?.testimonials)}
        />
      )}
      {/* Releated Course */}
      <RelatedCourse courses={courses} />
    </>
  );
};
export default SingleCoursePage;
