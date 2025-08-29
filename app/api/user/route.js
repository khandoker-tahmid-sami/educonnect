import { auth } from "@/auth";
import { getUserByEmail } from "@/queries/users";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const session = await auth(); //to get session we have to pass cookies from fetch.
    const user = await getUserByEmail(session?.user?.email);
    if (!user) {
      return NextResponse.json(
        { success: false, error: "user not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, data: user }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { success: false, error: error?.message ?? "Internal server error" },
      { status: 500 }
    );
  }
};
