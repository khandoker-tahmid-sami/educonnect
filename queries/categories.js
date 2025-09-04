import {
  replaceMongoIdInArray,
  replaceMongoIdInObject,
} from "@/lib/convertData";
import { Category } from "@/model/category-model";
import { dbConnect } from "@/service/connectMongo";

export const getCategories = async () => {
  await dbConnect();
  const categories = await Category.find().lean();
  return replaceMongoIdInArray(categories);
};

export const getCategoriesById = async (categoryId) => {
  await dbConnect();
  const category = await Category.findById(categoryId).lean();
  return replaceMongoIdInObject(category);
};
