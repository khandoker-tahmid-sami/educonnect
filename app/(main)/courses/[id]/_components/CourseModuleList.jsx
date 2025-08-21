import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Clock10, Video } from "lucide-react";
import CourseLessionList from "./CourseLessionList";

const CourseModuleList = ({ module }) => {
  return (
    <AccordionItem className="border-none" value="item-1">
      <AccordionTrigger>{module.title}</AccordionTrigger>
      <AccordionContent>
        {/* header */}
        <div className="flex gap-x-5 items-center flex-wrap mt-4 mb-6 text-gray-600 text-sm">
          <span className="flex items-center gap-1.5">
            <Video className="w-4 h-4" />
            {module.lessonIds.length} Lessons
          </span>
          <span className="flex items-center gap-1.5">
            <Clock10 className="w-4 h-4" />
            {(module.duration / 60).toPrecision(2)} Duration
          </span>
          {/* <span className="flex items-center gap-1.5">
            <NotepadText className="w-4 h-4" />
            10 Notes
          </span>
          <span className="flex items-center gap-1.5">
            <FileQuestion className="w-4 h-4" />
            10 Quiz
          </span>
          <span className="flex items-center gap-1.5">
            <Radio className="w-4 h-4" />1 Live Class
          </span> */}
        </div>
        {/* header ends */}

        <div className="space-y-3">
          {/* item */}
          {module?.lessonIds &&
            module?.lessonIds?.map((lessionId, index) => (
              <CourseLessionList key={index} lessionId={lessionId} />
            ))}
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};

export default CourseModuleList;
