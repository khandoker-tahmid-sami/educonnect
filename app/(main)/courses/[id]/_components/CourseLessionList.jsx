import { cn } from "@/lib/utils";
import { getLession } from "@/queries/lessions";
import { Tv } from "lucide-react";

const CourseLessionList = async ({ lessionId }) => {
  //   console.log(lessionId);
  const lession = await getLession(lessionId);
  if (!lession) return null;
  //   console.log(lession);
  return (
    <button
      type="button"
      className={cn(
        "flex items-center gap-x-2 text-slate-500 text-sm font-[500]  transition-all hover:text-slate-600  w-full"
      )}
    >
      <div className="flex items-center gap-x-2">
        <Tv size={16} className={cn("text-slate-500")} />
        {lession?.title}
      </div>
    </button>
  );
};

export default CourseLessionList;
