
import Link from "next/link";
import BookCard from "../../../components/BookCard/page";
import Book from "../../../models/Book";
import connectDB from "../../../lib/mongodb";

export default async function Page({ params }) {
  const { levelId } = await params;

  try {
    await connectDB();

    const levelBooks = await Book.find({ levelId }).lean();

    return (
      <div className="flex justify-center gap-6 p-6">
        {levelBooks.map((book) => (
          <BookCard
            key={book.slug}
            book={book}
          />
        ))}
      </div>
    );
  } catch (error) {
    console.error("MongoDB connection failed:", error);

    return (
      <div className="flex min-h-[70vh] items-center justify-center p-6">
        <div className="max-w-md rounded-2xl bg-neutral-800 p-8 text-center shadow-xl">
          
          <div className="mb-4 text-5xl">
            📚
          </div>

          <h2 className="mb-3 text-2xl font-bold text-white">
            اتصال به سرور برقرار نشد
          </h2>

          <p className="mb-6 text-gray-400">
            در حال حاضر امکان دریافت کتاب‌های آنلاین وجود ندارد
            می‌توانید تغدادی کتاب‌ را به صورت آفلاین بخوانید
          </p>

          <Link
            href="/offline-books"
            className="inline-block rounded-xl bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700"
          >
            📖 مشاهده کتاب‌های آفلاین
          </Link>

        </div>
      </div>
    );
  }
}













// import BookCard from "../../../components/BookCard/page";
// import Book from "../../../models/Book";
// import connectDB from "../../../lib/mongodb";




// export default async function Page({ params }) {
//   const { levelId } = await params;

//   await connectDB();

//   const levelBooks = await Book.find({ levelId }).lean();

//   return (
//     <div className="flex justify-center gap-6 p-6">
//       {levelBooks.map((book) => (
//         <BookCard
//           key={book.slug}
//           book={book}
//         />
//       ))}
//     </div>
//   );
// }