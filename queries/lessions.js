import { replaceMongoIdInObject } from "@/lib/convertData";
import { Lesson } from "@/model/lesson.model";
import { dbConnect } from "@/service/connectMongo";

export const getLession = async (lessionId) => {
  await dbConnect();

  const lession = await Lesson.findById(lessionId).lean();

  return replaceMongoIdInObject(lession);
};
