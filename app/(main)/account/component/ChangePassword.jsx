"use client";

import { changeUserPassword } from "@/app/actions/account";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "sonner";

const ChangePassword = ({ email }) => {
  const [passwordState, setPasswordState] = useState({
    oldPassword: "",
    newPassword: "",
    retypeNewPassword: "",
  });

  const handleChange = (event) => {
    const field = event.target.name;
    const value = event.target.value;

    setPasswordState({
      ...passwordState,
      [field]: value,
    });
  };

  const handlePasswordChange = async (event) => {
    event.preventDefault();

    console.log(passwordState);

    try {
      await changeUserPassword(
        email,
        passwordState.oldPassword,
        passwordState.newPassword,
        passwordState.retypeNewPassword
      );
      toast.success("Your password has been changed successfully");
    } catch (error) {
      console.log(error);
      toast.error(`Error: ${error.message}`);
    }
  };
  return (
    <div>
      <h5 className="text-lg font-semibold mb-4">Change password :</h5>
      <form onSubmit={handlePasswordChange}>
        <div className="grid grid-cols-1 gap-5">
          <div>
            <Label className="mb-2 block">Old password :</Label>
            <Input
              type="password"
              placeholder="Old password"
              name="oldPassword"
              id="oldPassword"
              required
              onChange={handleChange}
            />
          </div>
          <div>
            <Label className="mb-2 block">New password :</Label>
            <Input
              type="password"
              placeholder="New password"
              name="newPassword"
              id="newPassword"
              required
              onChange={handleChange}
            />
          </div>
          <div>
            <Label className="mb-2 block">Re-type New password :</Label>
            <Input
              type="password"
              placeholder="Re-type New password"
              name="retypeNewPassword"
              id="retypeNewPassword"
              required
              onChange={handleChange}
            />
          </div>
        </div>
        {/*end grid*/}
        <Button className="mt-5" type="submit" variant={"hero"}>
          Save password
        </Button>
      </form>
    </div>
  );
};

export default ChangePassword;
