import { NextResponse } from "next/server";

import connectDB from "../../../lib/mongodb";
import getCurrentUser from "../../../lib/getCurrentUser";

import ReadingProgress from "../../../models/ReadingProgress";

export async function POST(request) {
  try {
    await connectDB();

    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();

    const { bookId, chapterId, pageNumber } = body;
    console.log("SAVE PROGRESS:", {
      userId: user.id,
      bookId,
      chapterId,
      pageNumber,
    });

    const progress = await ReadingProgress.findOneAndUpdate(
      {
        userId: user.id,
        bookId,
      },
      {
        $set: {
          chapterId,
          pageNumber,
          status: "reading",
        },
      },
      {
        new: true,
        upsert: true,
        setDefaultsOnInsert: true,
      }
    );

    return NextResponse.json(progress);

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



// import { NextResponse } from "next/server";

// import connectDB from "../../../lib/mongodb";
// import getCurrentUser from "../../../lib/getCurrentUser";

// import ReadingProgress from "../../../models/ReadingProgress";

// export async function POST(request) {
//   try {
//     await connectDB();

//     const user = await getCurrentUser();

//     if (!user) {
//       return NextResponse.json(
//         {
//           message: "Unauthorized",
//         },
//         {
//           status: 401,
//         }
//       );
//     }

//     const body = await request.json();

//     const { bookId, chapterId, pageNumber } = body;

//     const progress = await ReadingProgress.findOneAndUpdate(
//       {
//         userId: user.id,
//         bookId,
//       },
//       {
//         userId: user.id,
//         bookId,
//         chapterId,
//         pageNumber,
//         status: "reading",
//       },
//       {
//         new: true,
//         upsert: true,
//         setDefaultsOnInsert: true,
//       }
//     );

//     return NextResponse.json(progress);

//   } catch (error) {
//     console.error(error);

//     return NextResponse.json(
//       {
//         message: "Server Error",
//       },
//       {
//         status: 500,
//       }
//     );
//   }
// }













// // import { NextResponse } from "next/server";

// // import connectDB from "../../../lib/mongodb";
// // import getCurrentUser from "../../../lib/getCurrentUser";

// // import ReadingProgress from "../../../models/ReadingProgress";

// // export async function POST(request) {
// //   try {
// //     await connectDB();

// //     const user = await getCurrentUser();

// //     if (!user) {
// //       return NextResponse.json(
// //         {
// //           message: "Unauthorized",
// //         },
// //         {
// //           status: 401,
// //         }
// //       );
// //     }

// //     const body = await request.json();

// //     const { bookId, chapterId, pageNumber } = body;

// //     const progress = await ReadingProgress.findOneAndUpdate(
// //       {
// //         userId: user.id,
// //         bookId,
// //       },
// //       {
// //         userId: user.id,
// //         bookId,
// //         chapterId,
// //         pageNumber,
// //         status: "reading",
// //         updatedAt: new Date(),
// //       },
// //       {
// //         new: true,
// //         upsert: true,
// //         setDefaultsOnInsert: true,
// //       }
// //     );

// //     return NextResponse.json(progress);
// //   } catch (error) {
// //     console.error(error);

// //     return NextResponse.json(
// //       {
// //         message: "Server Error",
// //       },
// //       {
// //         status: 500,
// //       }
// //     );
// //   }
// // }