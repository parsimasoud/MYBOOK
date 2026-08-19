
import Link from "next/link";

export default function Pagination({
    slug,
    chapterSlug,
    currentPage,
    lastPage,
  }) {
    return  <div className="flex justify-between mt-8 p-4">
    {currentPage === 1 ? (
      <span className="text-gray-700">Previous</span>
    ) : (
      <Link href={`/books/${slug}/read/${chapterSlug}/${currentPage - 1}`}>
        Previous
      </Link>
    )}
    {currentPage < lastPage ? (
      <Link href={`/books/${slug}/read/${chapterSlug}/${currentPage + 1}`}>
        <span>NEXT</span>
      </Link>
    ) : (
      <Link href={`/books/${slug}/read`}>CHAPTERS</Link>
    )}
  </div>;
  }