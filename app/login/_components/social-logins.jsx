import { Button } from "@/components/ui/button";
import Image from "next/image";

import { doSocialLogin } from "@/app/actions";

const SocialLogins = () => {
  return (
    <>
      <div className="text-center text-md mt-3 text-gray-500">
        or Signup with
      </div>
      <form action={doSocialLogin}>
        <div className="flex justify-center gap-2">
          <Button
            className="mt-4 py-5 border-gray-600/30 border rounded-md flex items-center gap-3 justify-center cursor-pointer"
            variant={"hero"}
            type="submit"
            name="action"
            value="google"
          >
            <Image src="/google.png" alt="google" width={40} height={40} />
            <span>Google</span>
          </Button>
          <Button
            className="mt-4 py-5 border-gray-600/30 border rounded-md flex items-center gap-3 justify-center cursor-pointer"
            type="submit"
            name="action"
            value="github"
          >
            <Image src="/GitHub-Logo.png" alt="github" width={60} height={60} />
            <span>Github</span>
          </Button>
        </div>
      </form>
    </>
  );
};

export default SocialLogins;
