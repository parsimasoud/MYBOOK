import Link from "next/link";

export default function BookCard({ book, levelId }){


    return(
        <Link href={`/books/${book.slug}`}>
        <article>
            <img className="w-30 h-40" src={book.coverImage} alt="" />
        </article>
        </Link>
    )
}