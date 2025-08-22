import { User } from "@/model/user-model";
import { dbConnect } from "@/service/connectMongo";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  const { firstName, lastName, email, password, userRole } =
    await request.json();

  console.log(firstName, lastName, email, password, userRole);

  await dbConnect();

  const hashedPassword = await bcrypt.hash(password, 5);

  const newUser = {
    firstName,
    lastName,
    email,
    password: hashedPassword,
    role: userRole,
  };

  console.log(newUser);

  try {
    await User.create(newUser);
    return NextResponse.json(
      {
        success: true,
        message: `User with this email ${email} has been created`,
      },
      { status: 201 }
    );
    // return new NextResponse("user has been created", { status: 201 });
  } catch (e) {
    console.log(e.message);
    return NextResponse.json(
      {
        success: false,
        error: error?.message || "Internal Server Error",
      },
      { status: 500 }
    );
    // return new NextResponse(e.message, { status: 500 });
  }
};
