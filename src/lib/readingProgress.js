import Chapter from "../models/Chapter";
import Page from "../models/Page";

export async function calculateNextProgress({
  bookId,
  chapterId,
  pageNumber,
}) {
  // فصل فعلی
  const currentChapter = await Chapter.findById(chapterId);

  if (!currentChapter) {
    return {
      chapterId,
      pageNumber,
      status: "reading",
    };
  }

  // تعداد صفحات فصل
  const totalPages = await Page.countDocuments({
    chapterId,
  });

  // هنوز آخر فصل نیست
  if (pageNumber < totalPages) {
    return {
      chapterId,
      pageNumber,
      status: "reading",
    };
  }

  // فصل بعد
  const nextChapter = await Chapter.findOne({
    bookId,
    number: currentChapter.number + 1,
  });

  // اگر فصل بعد وجود دارد
  if (nextChapter) {
    return {
      chapterId: nextChapter._id,
      pageNumber: 1,
      status: "reading",
    };
  }

  // کتاب تمام شده
  return {
    chapterId,
    pageNumber,
    status: "finished",
  };
}