import Link from "next/link";

export default function offLineBooks() {
  const offLineBooks = [
    {
        title: "Secret Garden",
        author: "F. Scott Fitzgerald",
        coverImage: "/books/secretGarden/cover.jpg",
        slug: "secret-garden",
        pdf: "/The-Secret-Garden.pdf",
      },
    {
      title: "raya",
      author: "E.B. White",
      coverImage: "/books/raya/cover.jpg",
      slug: "raya",
      pdf: "raya-and-the-last-dragong",
    },
    {
      title: "Harry",
      author: "J.K. Rowling",
      coverImage: "/books/harry/harryOne.jpg",
      slug:"harry",
      pdf: "/Book 1 - Harry Potter and the Sorcerers Stone",
    },
    {
      title: "The Hobbit",
      author: "J.R.R. Tolkien",
      coverImage: "/books/hobbit/cover.jpg",
      slug:"the-hobbit",
      pdf: "/hobbit 1",
    },
  ];

  return (
    <div className="flex gap-8 justify-center items-center pt-40">
      {offLineBooks.map((item) => (
        <Link key={item.slug} href={`/offline-books/${item.slug}`}>
          <article>
            <img   className="w-30 h-40 rounded-lg" src={item.coverImage} alt="" />
          </article>
        </Link>
      ))}
    </div>
  );
}
