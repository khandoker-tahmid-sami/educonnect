"use client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export default function Home() {
  const handleClick = (mode) => {
    mode ? toast.success("test success") : toast.error("test error");
  };
  return (
    <div>
      <Button onClick={() => handleClick(false)}>Test toast</Button>
    </div>
  );
}
