import { replaceMongoIdInObject } from "@/lib/convertData";
import { User } from "@/model/user-model";
import { dbConnect } from "@/service/connectMongo";
import bcrypt from "bcryptjs";

export const getUserByEmail = async (email) => {
  await dbConnect();
  const user = await User.findOne({ email: email }).lean();
  return replaceMongoIdInObject(user);
};

export const validateOldPassword = async (email, oldPassword) => {
  await dbConnect();
  const user = await getUserByEmail(email);

  const isMatch = await bcrypt.compare(oldPassword, user.password);
  return isMatch;
};
