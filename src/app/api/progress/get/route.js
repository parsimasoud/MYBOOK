// import { NextResponse } from "next/server";

// import connectDB from "../../../../lib/mongodb";
// import getCurrentUser from "../../../../lib/getCurrentUser";

// import ReadingProgress from "../../../../models/ReadingProgress";
// import Book from "../../../../models/Book";
// import Chapter from "../../../../models/Chapter";
// import Page from "../../../../models/Page";

// export async function GET() {
//   try {
//     await connectDB();

//     const user = await getCurrentUser();

//     if (!user) {
//       return NextResponse.json([]);
//     }

//     const progresses = await ReadingProgress.find({
//       userId: user.id,
//     })
//       .sort({
//         updatedAt: -1,
//       })
//       .limit(5)
//       .lean();

//     if (!progresses.length) {
//       return NextResponse.json([]);
//     }

//     const result = [];

//     for (const progress of progresses) {
//       const book = await Book.findById(progress.bookId).lean();

//       if (!book) continue;

//       const chapter = await Chapter.findById(progress.chapterId).lean();

//       if (!chapter) continue;

//       const totalPages = await Page.countDocuments({
//         chapterSlug: chapter.slug,
//       });

//       result.push({
//         bookTitle: book.title,
//         bookSlug: book.slug,
//         coverImage: book.coverImage,

//         chapterTitle: chapter.title,
//         chapterSlug: chapter.slug,

//         pageNumber: progress.pageNumber,
//         totalPages,

//         updatedAt: progress.updatedAt,
//       });
//     }

//     return NextResponse.json(result);
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
import { NextResponse } from "next/server";

import connectDB from "../../../../lib/mongodb";
import getCurrentUser from "../../../../lib/getCurrentUser";

import ReadingProgress from "../../../../models/ReadingProgress";
import Book from "../../../../models/Book";
import Chapter from "../../../../models/Chapter";
import Page from "../../../../models/Page";

export async function GET() {
  try {
    await connectDB();

    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json([]);
    }

    const progresses = await ReadingProgress.find({
      userId: user.id,
      // status: "reading",
    })
      .sort({
        updatedAt: -1,
      })
      .limit(5)
      .lean();

    if (!progresses.length) {
      return NextResponse.json([]);
    }

    const result = [];

    for (const progress of progresses) {
      const book = await Book.findById(progress.bookId).lean();

      if (!book) continue;

      const chapter = await Chapter.findById(progress.chapterId).lean();

      if (!chapter) continue;

      // فعلاً تعداد صفحات فصل
      const totalPages = await Page.countDocuments({
        chapterSlug: chapter.slug,
      });
      result.push({
        _id: progress._id,
      
        bookTitle: book.title,
        bookSlug: book.slug,
        coverImage: book.coverImage,
      
        chapterTitle: chapter.title,
        chapterSlug: chapter.slug,
      
        pageNumber: progress.pageNumber,
        totalPages,
      
        updatedAt: progress.updatedAt,
      });
      // result.push({
      //   bookId: book._id.toString(),

      //   bookTitle: book.title,
      //   bookSlug: book.slug,
      //   coverImage: book.coverImage,

      //   chapterId: chapter._id.toString(),
      //   chapterTitle: chapter.title,
      //   chapterSlug: chapter.slug,

      //   pageNumber: progress.pageNumber,
      //   totalPages,

      //   status: progress.status,
      //   updatedAt: progress.updatedAt,
      // });
    }

    return NextResponse.json(result);

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