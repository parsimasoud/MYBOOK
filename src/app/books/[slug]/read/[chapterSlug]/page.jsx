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
  return (
    <div>
      <h1>{chapterSlug}</h1>

      {pagesNumber.map((page) => (
        <Link
          key={page.pageNumber}
          href={`/books/${slug}/read/${chapterSlug}/${page.pageNumber}`}
        >
          <article>
            <h2>page {page.pageNumber}</h2>
          </article>
        </Link>
      ))}
    </div>
  );
}
