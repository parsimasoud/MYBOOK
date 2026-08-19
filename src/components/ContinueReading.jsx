"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import EmptyState from "../components/EmptyState";

export default function ContinueReading() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProgress();
  }, []);

  async function loadProgress() {
    try {
      const response = await fetch("/api/progress/get");
      const data = await response.json();

      setBooks(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  // async function handleDelete(id) {
  //   const confirmDelete = confirm("Remove this book from Continue Reading?");

  //   if (!confirmDelete) return;

  //   try {
  //     const response = await fetch("/api/progress/delete", {
  //       method: "DELETE",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         id,
  //       }),
  //     });

  //     const data = await response.json();

  //     console.log(data);

  //     if (data.success) {
  //       setBooks((prev) => prev.filter((book) => book._id !== id));
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }
  async function handleDelete(id) {
    const confirmDelete = window.confirm(
      "Remove this book from Continue Reading?"
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch("/api/progress/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
        }),
      });

      const data = await response.json();

      console.log("DELETE RESPONSE:", data);

      if (!response.ok) {
        console.error("DELETE ERROR:", data);
        return;
      }

      if (data.success) {
        setBooks((prevBooks) => prevBooks.filter((book) => book._id !== id));
      }
    } catch (error) {
      console.error("DELETE FETCH ERROR:", error);
    }
  }

  if (loading) {
    // return <p>Loading...</p>;
    return <div className="flex  items-center justify-center mt-7"> <div className="w-20 h-20 border-4 border-neutral-700 border-t-blue-500 rounded-full animate-spin" />
           </div>
  }

  if (!books.length) {
    return (
      <EmptyState
        title="هنوز کتابی ندارید"
        description1="در صورت ساین‌این کردن"

        description="کتاب‌های جدید بعد از اضافه شدن اینجا نمایش داده می‌شوند."
      />
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">Continue Reading</h2>

      {books.map((book) => {
        const percentage = Math.round(
          (book.pageNumber / book.totalPages) * 100
        );

        return (
          <div key={book._id} className="flex gap-5 items-start">
            <Link
              href={`/books/${book.bookSlug}/read/${book.chapterSlug}/${book.pageNumber}`}
              className="block flex-1"
            >
              <section className="rounded-2xl bg-neutral-800 p-6 transition-all duration-300 hover:scale-[1.01] hover:shadow-2xl">
                <div className="flex gap-6">
                  <img
                    src={book.coverImage}
                    alt={book.bookTitle}
                    className="w-32 rounded-xl shadow-lg"
                  />

                  <div className="flex flex-col justify-between flex-1">
                    <div>
                      <h3 className="text-2xl font-semibold">
                        {book.bookTitle}
                      </h3>

                      <p className="text-gray-400 mt-2">{book.chapterTitle}</p>

                      <div className="mt-5">
                        <div className="flex justify-between items-center text-sm text-gray-400 mb-2">
                          <span>
                            Page {book.pageNumber} of {book.totalPages}
                          </span>

                          <div className="flex items-center gap-3">
                            <span>{percentage}%</span>
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();

                                handleDelete(book._id);
                              }}
                              className="bg-red-800 rounded-2xl p-2 hover:scale-105 hover:bg-red-950"
                            >
                              Remove
                            </button>

                            {/* <button
                              onClick={(e) => {
                                e.preventDefault();
                                handleDelete(book._id);
                              }}
                              className="text-red-400 hover:text-red-600 transition"
                            >
                              Remove
                            </button> */}
                          </div>
                        </div>

                        <div className="w-full h-2 bg-neutral-700 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-blue-500 rounded-full transition-all duration-500"
                            style={{
                              width: `${percentage}%`,
                            }}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 text-blue-400 font-medium">
                      Continue Reading →
                    </div>
                  </div>
                </div>
              </section>
            </Link>
          </div>
        );
      })}
    </div>
  );
}

// "use client";

// import { useEffect, useState } from "react";
// import Link from "next/link";

// export default function ContinueReading() {
//   const [books, setBooks] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     async function loadProgress() {
//       try {
//         const response = await fetch("/api/progress/get");
//         const data = await response.json();

//         setBooks(data);
//       } catch (error) {
//         console.error(error);
//       } finally {
//         setLoading(false);
//       }
//     }

//     loadProgress();
//   }, []);

//   if (loading) {
//     return <p>Loading...</p>;
//   }

//   if (!books.length) {
//     return <p>No book in progress.</p>;
//   }

//   async function handleDelete(){

//     const confirmDelete = confirm(
//     "Remove this book from Continue Reading?"
//     );

//     if(!confirmDelete) return;

//     await fetch("/api/reading-progress/delete",{
//      method:"DELETE",
//      headers:{
//       "Content-Type":"application/json"
//      },
//      body:JSON.stringify({
//        id: progress._id
//      })
//     });

//     window.location.reload();

//     }

//   return (
//     <div className="space-y-6">

//       <h2 className="text-3xl font-bold">
//         Continue Reading
//       </h2>

//       {books.map((book) => {

//         const percentage = Math.round(
//           (book.pageNumber / book.totalPages) * 100
//         );

//         return (
//           <div className="flex">

//             <div className="w-3xl h-5">
//             <Link
//             key={`${book.bookSlug}-${book.chapterSlug}`}
//             href={`/books/${book.bookSlug}/read/${book.chapterSlug}/${book.pageNumber}`}
//             className="block"
//           >

//             <section className="rounded-2xl bg-neutral-800 p-6 transition-all duration-300 hover:scale-[1.01] hover:shadow-2xl">

//               <div className="flex gap-6">

//                 <img
//                   src={book.coverImage}
//                   alt={book.bookTitle}
//                   className="w-32 rounded-xl shadow-lg"
//                 />

//                 <div className="flex flex-col justify-between flex-1">

//                   <div>

//                     <h3 className="text-2xl font-semibold">
//                       {book.bookTitle}
//                     </h3>

//                     <p className="text-gray-400 mt-2">
//                       {book.chapterTitle}
//                     </p>

//                     <div className="mt-5">

//                       <div className="flex justify-between text-sm text-gray-400 mb-2">

//                         <span>
//                           Page {book.pageNumber} of {book.totalPages}
//                         </span>

//                         <span>
//                           {percentage}%
//                         </span>

//                       </div>

//                       <div className="w-full h-2 bg-neutral-700 rounded-full overflow-hidden">

//                         <div
//                           className="h-full bg-blue-500 rounded-full transition-all duration-500"
//                           style={{
//                             width: `${percentage}%`,
//                           }}
//                         />

//                       </div>

//                     </div>

//                   </div>

//                   <div className="mt-6 text-blue-400 font-medium">
//                     Continue Reading →
//                   </div>

//                 </div>

//               </div>

//             </section>

//           </Link>
//             </div>
//             <div   onClick={handleDelete} className="flex items-end w-full "><button className="bg-red-800 rounded-2xl p-2 hover:scale-105 hover:bg-red-950 ">remove from reading</button></div>
//           </div>

//         );
//       })}

//     </div>
//   );
// }
