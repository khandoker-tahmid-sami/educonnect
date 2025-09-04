import { auth } from "@/auth";
import { headers } from "next/headers";
import Image from "next/image";
import { redirect } from "next/navigation";
import AccountMenu from "./account-menu";

const AccountSidebar = async () => {
  const session = await auth();
  //   console.log(session);

  if (!session) {
    redirect("/login");
  }

  const base = process.env.NEXT_PUBLIC_APP_URL;
  const cookie = (await headers().get("cookie")) ?? "";
  const response = await fetch(`${base}/api/user`, {
    headers: { cookie },
    cache: "no-store",
  });
  const { data: user } = await response.json();
  //   console.log(user);
  return (
    <div className=" lg:w-1/4 md:px-3">
      <div className="relative">
        <div className="p-6 rounded-md shadow dark:shadow-gray-800 bg-white dark:bg-slate-900">
          <div className="profile-pic text-center mb-5">
            <input
              id="pro-img"
              name="profile-image"
              type="file"
              className="hidden"
              //   onChange="loadFile(event)"
            />
            <div>
              <div className="relative size-28 mx-auto">
                <Image
                  src="/assets/images/profile.jpg"
                  className="rounded-full shadow dark:shadow-gray-800 ring-4 ring-slate-50 dark:ring-slate-800"
                  id="profile-banner"
                  alt={`${user?.firstName} ${user?.lastName}`}
                  width={112}
                  height={112}
                />
                <label
                  className="absolute inset-0 cursor-pointer"
                  htmlFor="pro-img"
                />
              </div>
              <div className="mt-4">
                <h5 className="text-lg font-semibold">
                  {user?.firstName} {user?.lastName}
                </h5>
                <p className="text-slate-400">{user?.email}</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-100 dark:border-gray-700">
            <AccountMenu />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSidebar;
