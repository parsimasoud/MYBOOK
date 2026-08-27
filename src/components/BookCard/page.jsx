import Link from "next/link";

export default function BookCard({ book, levelId }){


    return(
        <Link href={`/books/${book.slug}`}>
        <article>
            <div className="flex flex-col w-40 text-center">
            <img className="w-40 h-50 rounded-lg" src={book.coverImage} alt="" />
            <h4>{book.title}</h4>
            </div>
            
        </article>
        </Link>
    )
}