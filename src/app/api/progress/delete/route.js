import { NextResponse } from "next/server";

import connectDB from "../../../../lib/mongodb";
import getCurrentUser from "../../../../lib/getCurrentUser";
import ReadingProgress from "../../../../models/ReadingProgress";

export async function DELETE(request) {
  try {
    await connectDB();

    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    const { id } = await request.json();

    console.log("DELETE ID:", id);
    console.log("USER ID:", user.id);

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          message: "Progress id is required",
        },
        {
          status: 400,
        }
      );
    }

    const deleted = await ReadingProgress.findOneAndDelete({
      _id: id,
      userId: user.id,
    });

    console.log("DELETED:", deleted);

    if (!deleted) {
      return NextResponse.json(
        {
          success: false,
          message: "Reading progress not found",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Reading progress removed",
    });

  } catch (error) {
    console.error("DELETE PROGRESS ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
}