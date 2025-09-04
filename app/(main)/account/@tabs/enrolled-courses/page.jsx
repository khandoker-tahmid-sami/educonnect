import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { getEnrollmentsForUser } from "@/queries/enrollments";
import { getUserByEmail } from "@/queries/users";
import Link from "next/link";
import { redirect } from "next/navigation";
import EnrolledCourseCard from "../../component/EnrolledCourseCard";

const EnrolledCourses = async () => {
  const session = await auth();
  console.log(session);

  if (!session.user) {
    redirect("/login");
  }

  const user = await getUserByEmail(session?.user?.email);
  console.log(user);

  const enrollments = await getEnrollmentsForUser(user?.id);
  console.log(enrollments);

  return (
    <div className="grid sm:grid-cols-2 gap-6">
      {enrollments && enrollments.length > 0 ? (
        <>
          {enrollments.map((enrollment) => (
            <EnrolledCourseCard key={enrollment.id} enrollment={enrollment} />
          ))}
        </>
      ) : (
        <div className="col-span-full flex min-h-[40vh] flex-col items-center justify-center gap-4">
          <p className="text-center text-slate-600">
            You did not enrolled any courses.
          </p>

          <Button asChild variant={"hero"}>
            <Link href={"/courses"}>Browse Courses</Link>
          </Button>
        </div>
      )}
    </div>
  );
};

export default EnrolledCourses;
