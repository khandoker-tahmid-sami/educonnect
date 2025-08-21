import { getCategories } from "@/queries/categories";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const categories = await getCategories();
    return NextResponse.json(
      { success: true, data: categories },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { success: false, error: error?.message ?? "Internal Server Error" },
      { status: 500 }
    );
  }
};
