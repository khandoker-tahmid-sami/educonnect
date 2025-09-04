import { headers } from "next/headers";
import ChangePassword from "../component/ChangePassword";
import ContactInfo from "../component/ContactInfo";
import PersonalDetails from "../component/PersonalDetails";

const ProfilePage = async () => {
  const base = process.env.NEXT_PUBLIC_APP_URL;
  const cookie = (await headers().get("cookie")) ?? "";
  const response = await fetch(`${base}/api/user`, {
    headers: { cookie },
    cache: "no-store",
  });
  const { data: user } = await response.json();
  console.log(user);
  return (
    <>
      <PersonalDetails user={user} />
      <div className="p-6 rounded-md shadow dark:shadow-gray-800 bg-white dark:bg-slate-900 mt-[30px]">
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-5">
          <ContactInfo user={user} />
          {/*end col*/}
          <ChangePassword email={user?.email} />
          {/*end col*/}
        </div>
        {/*end row*/}
      </div>
    </>
  );
};

export default ProfilePage;
