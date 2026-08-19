import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectDB from "../../../../lib/mongodb";
import User from "../../../../models/User";

export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();

    const { name, email, password } = body;

    // بررسی خالی نبودن فیلدها
    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "All fields are required." },
        { status: 400 }
      );
    }

    // بررسی وجود کاربر
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return NextResponse.json(
        { message: "Email already exists." },
        { status: 400 }
      );
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    // ساخت کاربر جدید
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return NextResponse.json(
      {
        message: "User created successfully.",
        user:{
          name: user.name,
          email: user.email,
        },
      }
     ,
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Server Error",
      },
      {
        status: 500,
      }
    );
  }
}