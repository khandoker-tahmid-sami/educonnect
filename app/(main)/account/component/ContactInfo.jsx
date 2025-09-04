"use client";
import { updateUserContactInfo } from "@/app/actions/account";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "sonner";

const ContactInfo = ({ user }) => {
  const [contactInfo, setContactInfo] = useState({
    phone: user?.phone,
    socialMedia: user?.socialMedia,
  });

  const handleChange = (event) => {
    const field = event.target.name;
    const value = event.target.value;

    setContactInfo({
      ...contactInfo,
      [field]: value,
    });
  };

  const handleUpdate = async (event) => {
    event.preventDefault();

    console.log(contactInfo);

    try {
      await updateUserContactInfo(user?.email, contactInfo);
      toast.success("User contact info updated successfully");
    } catch (error) {
      console.log(error);
      toast.error(`Error: ${error.message}`);
    }
  };
  return (
    <div>
      <h5 className="text-lg font-semibold mb-4">Contact Info :</h5>
      <form onSubmit={handleUpdate}>
        <div className="grid grid-cols-1 gap-5">
          <div>
            <Label className="mb-2 block">Phone No. :</Label>
            <Input
              name="phone"
              id="phone"
              type="text"
              value={contactInfo?.phone}
              placeholder="Phone :"
              onChange={handleChange}
            />
          </div>
          <div>
            <Label className="mb-2 block">LinkedIn :</Label>
            <Input
              name="socialMedia"
              id="socialMedia"
              value={contactInfo?.socialMedia}
              type="url"
              placeholder="Url :"
              onChange={handleChange}
            />
          </div>
        </div>
        {/*end grid*/}
        <Button className="mt-5" type="submit" variant={"hero"}>
          Add
        </Button>
      </form>
    </div>
  );
};

export default ContactInfo;
