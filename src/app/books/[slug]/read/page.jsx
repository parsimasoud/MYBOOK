import Link from "next/link";
import connectDB from "../../../../lib/mongodb";
import Chapter from "../../../../models/Chapter"
import Book from "../../../../models/Book";

// const chapters = [
//   {
//     bookSlug: "the-hobbit",
//     number: 1,
//     title: "An Unexpected Party",
//     slug: "an-unexpected-party",
//     isPublished: true,
//   },
//   {
//     bookSlug: "the-hobbit",
//     number: 2,
//     title: "Roast Mutton",
//     slug: "roast-mutton",
//     isPublished: true,
//   },
//   {
//     bookSlug: "the-hobbit",
//     number: 3,
//     title: "A Short Rest",
//     slug: "a-short-rest",
//     isPublished: true,
//   },
// ];


export default async function ReadingPage({ params }) {
  await connectDB();

  const { slug } = await params;
   console.log(slug)
  const chapters = await Chapter.find({
    bookSlug: slug,
    isPublished: true,
  }).sort({ number: 1 });

  const book = await Book.findOne({
    slug: slug,
  });
   
  console.log(book);

  return (
    <div className="min-h-screen bg-[#0b0f16] p-6">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 md:flex-row">
  
        {/* Chapters */}
        <div className="flex-1 rounded-2xl border border-gray-700 bg-[#151c28] p-6 shadow-xl">
  
          <h1 className="mb-6 text-3xl font-bold text-white">
            Chapters
          </h1>
  
          <div className="flex flex-col gap-4">
            {chapters.map((chapter) => (
              <Link
                key={chapter._id}
                href={`/books/${slug}/read/${chapter.slug}`}
                className="group"
              >
                <article className="flex items-center gap-5 rounded-xl border border-gray-700 bg-[#202b3b] p-5 transition hover:border-blue-500 hover:bg-[#293950]">
  
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-500 text-xl font-bold text-white">
                    {chapter.number}
                  </div>
  
                  <div>
                    <h2 className="text-lg font-semibold text-white">
                      Chapter {chapter.number}
                    </h2>
  
                    <p className="mt-1 text-gray-400">
                      {chapter.title}
                    </p>
                  </div>
  
                  <span className="ml-auto text-2xl text-gray-400 transition group-hover:translate-x-1 group-hover:text-blue-400">
                    ›
                  </span>
  
                </article>
              </Link>
            ))}
          </div>
        </div>
  
        {/* Book Image */}
        {book?.backgroundImage && (
          <div className="flex w-full items-start justify-center md:w-5/12">
            <div className="overflow-hidden rounded-2xl border border-gray-700 shadow-xl">
              <img
                src={book.backgroundImage}
                alt={book.title || "Book cover"}
                className="h-auto max-h-[600px] w-full object-cover"
              />
            </div>
          </div>
        )}
  
      </div>
    </div>
  );
}