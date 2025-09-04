"use server";

import { validateOldPassword } from "@/queries/users";
import bcrypt from "bcryptjs";

import { User } from "@/model/user-model";
import { dbConnect } from "@/service/connectMongo";
import { revalidatePath } from "next/cache";

export const updateUserInfo = async (email, updateData) => {
  try {
    await dbConnect();
    await User.findOneAndUpdate({ email: email }, updateData);
    revalidatePath("/account");
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const updateUserContactInfo = async (email, updateData) => {
  try {
    await dbConnect();
    await User.findOneAndUpdate({ email: email }, updateData);
    revalidatePath("/account");
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const changeUserPassword = async (
  email,
  oldPassword,
  newPassword,
  retypeNewPassword
) => {
  const isMatch = await validateOldPassword(email, oldPassword);

  if (!isMatch) {
    throw new Error("Your current password did not match");
  }

  if (newPassword != retypeNewPassword) {
    throw new Error("Your new password does not match with retype password");
  }

  const hashedPassword = await bcrypt.hash(newPassword, 5);

  const passwordToUpdate = {
    password: hashedPassword,
  };

  try {
    await dbConnect();
    await User.findOneAndUpdate({ email: email }, passwordToUpdate);
    revalidatePath("/account");
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
