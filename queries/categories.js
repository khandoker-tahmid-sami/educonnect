import { dbConnect } from "@/service/connectMongo";
import { Category } from "@/model/category-model";
import { replaceMongoIdInArray } from "@/lib/convertData";

export const getCategories = async () => {
  await dbConnect();
  const categories = await Category.find().lean();
  return replaceMongoIdInArray(categories);
};
