import { User } from "@/model/user-model";
import { dbConnect } from "@/service/connectMongo";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  const { firstName, lastName, email, password, userRole } =
    await request.json();

  console.log(firstName, lastName, email, password, userRole);

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
    await dbConnect();

    const exists = await User.findOne({ email: email }).lean();
    if (exists) {
      return NextResponse.json(
        {
          success: false,
          error: `User with this email ${email} has already exist.`,
        },
        { status: 409 }
      );
    } else {
      await User.create(newUser);
      return NextResponse.json(
        {
          success: true,
          message: `User with this email ${email} has been created`,
        },
        { status: 201 }
      );
    }

    // return new NextResponse("user has been created", { status: 201 });
  } catch (error) {
    console.log(error.message);
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
