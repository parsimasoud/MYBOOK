
"use client";

import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

export default function PDFViewer({ pdf }) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [inputPage, setInputPage] = useState("1");

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  // تغییر صفحه + هماهنگ کردن input
  const changePage = (page) => {
    setPageNumber(page);
    setInputPage(String(page));
  };

  const goToPrevPage = () => {
    setPageNumber((prev) => {
      const newPage = Math.max(prev - 1, 1);
      setInputPage(String(newPage));
      return newPage;
    });
  };

  const goToNextPage = () => {
    setPageNumber((prev) => {
      const newPage = Math.min(prev + 1, numPages);
      setInputPage(String(newPage));
      return newPage;
    });
  };

  const goToPage = () => {
    const page = Number(inputPage);

    if (!page || page < 1 || page > numPages) {
      return;
    }

    changePage(page);
  };

  return (
    <div className="p-2.5">

      <nav className="mb-2 flex gap-4 justify-center items-center text-black">

        <button
          onClick={goToPrevPage}
          disabled={pageNumber <= 1}
        >
          Prev
        </button>

        <span>Page</span>

        <input
          type="number"
          min="1"
          max={numPages || undefined}
          value={inputPage}
          onChange={(e) => setInputPage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              goToPage();
            }
          }}
          style={{
            width: "70px",
            padding: "0.5rem",
            textAlign: "center",
          }}
        />

        <span>
          of {numPages || "..."}
        </span>

        <button
          onClick={goToPage}
          disabled={!numPages}
        >
          Go
        </button>

        <button
          onClick={goToNextPage}
          disabled={!numPages || pageNumber >= numPages}
        >
          Next
        </button>

      </nav>

      <div
        style={{
          border: "1px solid #ccc",
          borderRadius: "4px",
          overflow: "hidden",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Document
          file={pdf}
          onLoadSuccess={onDocumentLoadSuccess}
          loading={
            <div style={{ padding: "2rem" }}>
              Loading PDF...
            </div>
          }
          error={
            <div
              style={{
                padding: "2rem",
                color: "red",
              }}
            >
              Failed to load PDF.
            </div>
          }
        >
          <Page
            pageNumber={pageNumber}
            renderTextLayer={true}
            renderAnnotationLayer={true}
            width={800}
          />
        </Document>
      </div>

    </div>
  );
}



// "use client";

// import { useState } from "react";
// import { Document, Page, pdfjs } from "react-pdf";

// import "react-pdf/dist/Page/TextLayer.css";
// import "react-pdf/dist/Page/AnnotationLayer.css";

// pdfjs.GlobalWorkerOptions.workerSrc = new URL(
//   "pdfjs-dist/build/pdf.worker.min.mjs",
//   import.meta.url
// ).toString();

// export default function PDFViewer({ pdf }) {
//   const [numPages, setNumPages] = useState(null);
//   const [pageNumber, setPageNumber] = useState(1);
//   const [inputPage, setInputPage] = useState("1");

//   const onDocumentLoadSuccess = ({ numPages }) => {
//     setNumPages(numPages);
//   };

//   const goToPrevPage = () => {
//     setPageNumber((prev) => Math.max(prev - 1, 1));
//   };

//   const goToNextPage = () => {
//     setPageNumber((prev) => Math.min(prev + 1, numPages));
//   };

//   const goToPage = () => {
//     const page = Number(inputPage);

//     if (!page || page < 1 || page > numPages) {
//       return;
//     }

//     setPageNumber(page);
//   };

//   return (
//     <div className="p-2.5">

//       <nav
//         // style={{
//         //   marginBottom: "1rem",
//         //   display: "flex",
//         //   gap: "1rem",
//         //   alignItems: "center",
//         //   justifyContent: "center",
//         // }}
//         className="mb-2 flex gap-4 justify-center items-center text-black"
//       >
//         <button
//           onClick={goToPrevPage}
//           disabled={pageNumber <= 1}
//         >
//           Prev
//         </button>

//         <span>Page</span>

//         <input
//           type="number"
//           min="1"
//           max={numPages || undefined}
//           value={inputPage}
//           onChange={(e) => setInputPage(e.target.value)}
//           onKeyDown={(e) => {
//             if (e.key === "Enter") {
//               goToPage();
//             }
//           }}
//           style={{
//             width: "70px",
//             padding: "0.5rem",
//             textAlign: "center",
//           }}
//         />

//         <span>
//           of {numPages || "..."}
//         </span>

//         <button
//           onClick={goToPage}
//           disabled={!numPages}
//         >
//           Go
//         </button>

//         <button
//           onClick={goToNextPage}
//           disabled={!numPages || pageNumber >= numPages}
//         >
//           Next
//         </button>
//       </nav>

//       <div
//         style={{
//           border: "1px solid #ccc",
//           borderRadius: "4px",
//           overflow: "hidden",
//           display: "flex",
//           justifyContent: "center",
//         }}
//       >
//         <Document
//           file={pdf}
//           onLoadSuccess={onDocumentLoadSuccess}
//           loading={
//             <div style={{ padding: "2rem" }}>
//               Loading PDF...
//             </div>
//           }
//           error={
//             <div
//               style={{
//                 padding: "2rem",
//                 color: "red",
//               }}
//             >
//               Failed to load PDF.
//             </div>
//           }
//         >
//           <Page
//             pageNumber={pageNumber}
//             renderTextLayer={true}
//             renderAnnotationLayer={true}
//             width={800}
//           />
//         </Document>
//       </div>
//     </div>
//   );
// }