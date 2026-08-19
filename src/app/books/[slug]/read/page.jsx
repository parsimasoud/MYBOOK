import Link from "next/link";
import connectDB from "../../../../lib/mongodb";
import Chapter from "../../../../models/Chapter"

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

  const chapters = await Chapter.find({
    bookSlug: slug,
    isPublished: true,
  }).sort({ number: 1 });

  console.log(chapters);

  return (
    <div>
      <h1>Chapters</h1>

      {chapters.map((chapter) => (
        <Link
          key={chapter._id}
          href={`/books/${slug}/read/${chapter.slug}`}
        >
          <article>
            <h2>Chapter {chapter.number}</h2>
            <p>{chapter.title}</p>
          </article>
        </Link>
      ))}
    </div>
  );
}