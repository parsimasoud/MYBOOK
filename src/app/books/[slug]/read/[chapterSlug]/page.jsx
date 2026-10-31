import Link from "next/link";
import connectDB from "../../../../../lib/mongodb";
import Page from "../../../../../models/Page"



// const pages = [
//   {
//     chapterSlug: "an-unexpected-party",
//     pageNumber: 1,
  
//     content: [
//       {
//         type: "paragraph",
//         text: "In a hole in the ground there lived a hobbit. n a hole in the ground there lived a hobbit n a hole in the ground there lived a hobbit n a hole in the ground there lived a hobbit"
//       },
  
//       {
//         type: "paragraph",
//         text: "Not a nasty, dirty, wet hole, filled with the ends of worms."
//       },
  
//       {
//         type: "image",
//         src: "/books/hobbit/lmmap.jpg",
//         caption: "Bag End"
//       },
  
//       {
//         type: "paragraph",
//         text: "It was a hobbit-hole, and that means comfort. hole in the ground there lived a hobbit n a hole in the ground there lived a hobbit n a hole in the ground there lived a hobbit n a hole in the ground there lived a hobbit"
//       }
//     ],
  
//     isPublished: true
//   }

 
// ];

export default async function Pages({ params }) {
  await connectDB();

  // const pages = await Page.find();
  const { slug, chapterSlug } = await params;

const pagesNumber = await Page.find({
    chapterSlug: chapterSlug,
    isPublished: true,
  }).sort({ pageNumber: 1 });
  // return (

  //   <div>
  //     <h1>{chapterSlug}</h1>

  //     {pagesNumber.map((page) => (
  //       <Link
  //         key={page.pageNumber}
  //         href={`/books/${slug}/read/${chapterSlug}/${page.pageNumber}`}
  //       >
  //         <article>
  //           <h2>page {page.pageNumber}</h2>
  //         </article>
  //       </Link>
  //     ))}
  //   </div>
  // );
  return (
    <div className="min-h-screen bg-[#0b0f16] px-6 py-10">
  
      <div className="mx-auto max-w-6xl">
  
        {/* Header */}
        <div className="mb-10">
          <p className="mb-2 text-sm font-medium text-blue-400">
            BOOK READER / CHAPTERS
          </p>
  
          <h1 className="text-3xl font-bold text-white">
            {chapterSlug}
          </h1>
  
          <p className="mt-3 text-gray-400">
            Choose a page and start reading
          </p>
        </div>
  
        {/* Pages */}
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
  
          {pagesNumber.map((page) => (
            <Link
              key={page.pageNumber}
              href={`/books/${slug}/read/${chapterSlug}/${page.pageNumber}`}
              className="group"
            >
              <article className="flex aspect-square flex-col items-center justify-center rounded-2xl border border-gray-700 bg-[#151e2c] transition duration-300 hover:-translate-y-2 hover:border-blue-500 hover:bg-[#1e3048] hover:shadow-lg hover:shadow-blue-500/10">
  
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-500/15 text-2xl font-bold text-blue-400 transition group-hover:bg-blue-500 group-hover:text-white">
                  {page.pageNumber}
                </div>
  
                <h2 className="text-lg font-semibold text-white">
                  Page {page.pageNumber}
                </h2>
  
                <p className="mt-2 text-sm text-gray-500 group-hover:text-blue-300">
                  Start Reading →
                </p>
  
              </article>
            </Link>
          ))}
  
        </div>
      </div>
    </div>
  );
}
