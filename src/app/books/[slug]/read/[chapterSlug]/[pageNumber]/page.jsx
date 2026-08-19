import BookText from "../../../../../../components/BookText";
import Pagination from "../../../../../../components/Pagination";

import connectDB from "../../../../../../lib/mongodb";
import Page from "../../../../../../models/Page";

export default async function PageDetail({ params }) {
  await connectDB();

  const { slug, chapterSlug, pageNumber } = await params;

  const page = await Page.findOne({
    chapterSlug,
    pageNumber: Number(pageNumber),
  }).lean();

  if (!page) {
    return <div>Page not found</div>;
  }

  const pageData = {
    ...page,
    _id: page._id.toString(),
    bookId: page.bookId.toString(),
    chapterId: page.chapterId.toString(),
  };

  const currentPage = Number(pageNumber);

  const lastPage = await Page.countDocuments({
    chapterSlug,
  });

  return (
    <div className="min-h-screen bg-neutral-900 text-gray-100">
      <main className="max-w-4xl mx-auto px-8 py-12">
        <BookText
          page={pageData}
          bookId={pageData.bookId}
          chapterId={pageData.chapterId}
        />

        <Pagination
          slug={slug}
          chapterSlug={chapterSlug}
          currentPage={currentPage}
          lastPage={lastPage}
        />
      </main>
    </div>
  );
}