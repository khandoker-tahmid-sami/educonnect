import { replaceMongoIdInObject } from "@/lib/convertData";
import { Assessment } from "@/model/assessment-model";
import { Report } from "@/model/report-model";
import { dbConnect } from "@/service/connectMongo";

export const getAReport = async (filter) => {
  await dbConnect();

  try {
    const report = await Report.findOne(filter)
      .populate({
        path: "quizAssessment",
        model: Assessment,
      })
      .lean();
    return replaceMongoIdInObject(report);
  } catch (err) {
    throw new Error(err);
  }
};
