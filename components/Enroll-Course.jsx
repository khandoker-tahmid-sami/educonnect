"use client";

import { createCheckoutSession } from "@/app/actions/stripe";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

export const EnrollCourse = ({ asLink, course }) => {
  // console.log(course);
  const formAction = async (data) => {
    const { url } = await createCheckoutSession(data);
    window.location.assign(url);
  };

  return (
    <>
      <form action={formAction}>
        <input type="hidden" name="courseId" value={course?.id} />
        {/* <input type="hidden" name="courseName" value={course?.title} />
        <input type="hidden" name="coursePrice" value={course?.price} /> */}
        {/* this two input can be malicious. thats wy I did not pass through formData.Rather I used api in stripe.js file */}
        {asLink ? (
          <Button
            type="submit"
            variant="ghost"
            className="text-xs text-sky-700 h-7 gap-1"
          >
            Enroll
            <ArrowRight className="w-3" />
          </Button>
        ) : (
          <Button
            type="submit"
            className={cn(buttonVariants({ size: "lg", variant: "hero" }))}
          >
            Enroll Now
          </Button>
        )}
      </form>
    </>
  );
};

export default EnrollCourse;
