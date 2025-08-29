import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { sendEmails } from "@/lib/emails";
import { stripe } from "@/lib/stripe";
import { CircleCheck } from "lucide-react";
import { headers as nextHeaders } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

const Success = async ({ searchParams }) => {
  const { session_id, courseId } = await searchParams;
  // console.log(session_id, courseId);

  if (!session_id)
    throw new Error("please provide a valid session id that starts with cs_");

  const userSession = await auth();

  if (!userSession?.user?.email) {
    redirect("/login");
  }

  const header = await nextHeaders();

  const origin = header.get("origin") ?? process.env.NEXT_PUBLIC_APP_URL;
  const cookie = header.get("cookie") ?? "";

  const [courseRes, userRes] = await Promise.all([
    fetch(`${origin}/api/courses/${courseId}`, { cache: "no-store" }),
    fetch(`${origin}/api/user`, {
      headers: { cookie },
      cache: "no-store",
    }),
  ]);

  if (!courseRes.ok) throw new Error("failed to fetch course by id");
  if (!userRes.ok) throw new Error("user not found");

  const [{ data: course }, { data: user }] = await Promise.all([
    courseRes.json(),
    userRes.json(),
  ]);

  // console.log(course, user);

  const customerName = `${user.firstName} ${user.lastName}`;
  const customerEmail = user.email;
  const courseName = course.title;
  // console.log(customerName, customerEmail, courseName);

  const checkoutSession = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ["line_items", "payment_intent"],
  });

  // console.log(checkoutSession);

  const paymentIntent = checkoutSession?.payment_intent;
  const paymentStatus = paymentIntent.status;

  // console.log(paymentStatus);

  if (paymentStatus === "succeeded") {
    //send mails
    const instructorName = `${course?.instructor?.firstName} ${course?.instructor?.lastName}`;
    const instructorEmail = `${course.instructor.email}`;
    // console.log(instructorEmail, customerEmail);
    const emailsToSend = [
      {
        to: instructorEmail,
        subject: `New enrollment for ${courseName}`,
        message: `Congratulations, ${instructorName}. A new student, ${customerName} has enrolled to your course ${courseName} just now. Please check the instructor dashboard and give a high-five to your new student.`,
      },
      {
        to: customerEmail,
        subject: `Enrollment Success for ${courseName}`,
        message: `Hey ${customerName} You have successfully enrolled for the course ${courseName}`,
      },
    ];

    const results = await sendEmails(emailsToSend);
    for (const r of results) {
      if (r.status === "rejected") {
        console.error(
          "Send failed:",
          r.reason?.name,
          r.reason?.statusCode,
          r.reason?.message
        );
      } else {
        console.log("Send ok:", r.value);
      }
    }
  }

  return (
    <div className="h-full w-full flex-1 flex flex-col items-center justify-center">
      <div className="flex flex-col items-center gap-6 max-w-[600px] text-center">
        {paymentStatus === "succeeded" ? (
          <>
            <CircleCheck className="w-32 h-32 bg-success rounded-full p-0 text-white" />
            <h1 className="text-xl md:text-2xl lg:text-3xl">
              Congratulations <strong>{customerName}</strong>, Your Enrollment
              was Successful for <strong>{courseName}</strong>
            </h1>
            <div className="flex items-center gap-3">
              <Button asChild size="sm">
                <Link href="/courses">Browse Courses</Link>
              </Button>
              <Button asChild variant="outline" size="sm">
                <Link href="/think-in-a-redux-way/introduction">
                  Play Course
                </Link>
              </Button>
            </div>
          </>
        ) : (
          <>
            <Button variant="outline" size="sm">
              Try again
            </Button>
          </>
        )}
      </div>
    </div>
  );
};
export default Success;
