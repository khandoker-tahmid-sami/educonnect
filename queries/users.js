import { replaceMongoIdInObject } from "@/lib/convertData";
import { User } from "@/model/user-model";
import { dbConnect } from "@/service/connectMongo";

export const getUserByEmail = async (email) => {
  await dbConnect();
  const user = await User.findOne({ email: email }).lean();
  return replaceMongoIdInObject(user);
};
