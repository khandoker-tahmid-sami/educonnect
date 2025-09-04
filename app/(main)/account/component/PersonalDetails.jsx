"use client";
import { updateUserInfo } from "@/app/actions/account";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { toast } from "sonner";

const PersonalDetails = ({ user }) => {
  const [userInfo, setUserInfo] = useState({
    firstName: user?.firstName,
    lastName: user?.lastName,
    email: user?.email,
    designation: user?.designation,
    bio: user?.bio,
  });

  const handleChange = (event) => {
    const field = event.target.name;
    const value = event.target.value;

    setUserInfo({
      ...userInfo,
      [field]: value,
    });
  };

  const handleUpdate = async (event) => {
    event.preventDefault();

    // console.log(userInfo);

    //update user info using server action
    try {
      await updateUserInfo(user?.email, userInfo);
      toast.success("User details updated successfully");
    } catch (error) {
      console.log(error);
      toast.error(`Error: ${error.message}`);
    }

    //update user info using api
  };
  return (
    <div className="p-6 rounded-md shadow dark:shadow-gray-800 bg-white dark:bg-slate-900">
      <h5 className="text-lg font-semibold mb-4">Personal Detail :</h5>
      <form onSubmit={handleUpdate}>
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-5">
          <div>
            <Label className="mb-2 block">
              First Name : <span className="text-red-600">*</span>
            </Label>
            <Input
              type="text"
              placeholder="First Name:"
              id="firstname"
              name="firstName"
              value={userInfo?.firstName}
              required
              onChange={handleChange}
            />
          </div>
          <div>
            <Label className="mb-2 block">
              Last Name : <span className="text-red-600">*</span>
            </Label>
            <Input
              type="text"
              placeholder="Last Name:"
              value={userInfo?.lastName}
              name="lastName"
              required
              onChange={handleChange}
            />
          </div>
          <div>
            <Label className="mb-2 block">
              Your Email : <span className="text-red-600">*</span>
            </Label>
            <Input
              type="email"
              placeholder="Email"
              value={userInfo?.email}
              name="email"
              disabled
            />
          </div>
          <div>
            <Label className="mb-2 block">Designation :</Label>
            <Input
              name="designation"
              value={userInfo?.designation}
              id="designation"
              type="text"
              placeholder="Occupation :"
              onChange={handleChange}
            />
          </div>
        </div>
        {/*end grid*/}
        <div className="grid grid-cols-1">
          <div className="mt-5">
            <Label className="mb-2 block">Bio :</Label>
            <Textarea
              id="bio"
              value={userInfo?.bio}
              name="bio"
              placeholder="Message :"
              onChange={handleChange}
            />
          </div>
        </div>
        {/*end row*/}
        <Button className="mt-5" asChild variant={"hero"}>
          <input type="submit" name="send" value="Save Changes" />
        </Button>
      </form>
      {/*end form*/}
    </div>
  );
};

export default PersonalDetails;
