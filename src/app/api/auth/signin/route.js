import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import connectDB from "../../../../lib/mongodb";
import User from "../../../../models/User";
import { createToken } from "../../../../lib/getCurrentUser";
import { cookies } from "next/headers";

export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();

    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        {
          message: "Email and password are required",
        },
        {
          status: 400,
        }
      );
    }


    const user = await User.findOne({
      email,
    });


    if (!user) {
      return NextResponse.json(
        {
          message: "User not found",
        },
        {
          status: 404,
        }
      );
    }


    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.password
    );


    if (!isPasswordCorrect) {
      return NextResponse.json(
        {
          message: "Invalid password",
        },
        {
          status: 401,
        }
      );
    }


    // const token = createToken({
    //     id: user._id,
    //     email: user.email,
    //   });
    const token = createToken({
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      role: user.role,
    });
      
      
      const cookieStore = await cookies();
      
      cookieStore.set(
        "token",
        token,
        {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          maxAge: 60 * 60 * 24 * 7,
          path: "/",
        }
      );
      
      
      // return NextResponse.json({
      //   message: "Login successful",
      //   user: {
      //     id: user._id,
      //     name: user.name,
      //     email: user.email,
      //   },
      // });
      return NextResponse.json({
        message: "Login successful",
        user: {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          avatar: user.avatar,
          role: user.role,
        },
      });


  } catch (error) {

    console.error(error);

    return NextResponse.json(
      {
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
}