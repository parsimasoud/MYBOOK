"use client";

import dynamic from "next/dynamic";

const PDFViewer = dynamic(
  () => import("./PDFViewer"),
  {
    ssr: false,
    loading: () => (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        Loading PDF Viewer...
      </div>
    ),
  }
);

export default function PDFViewerClient({ pdf }) {
  return <PDFViewer pdf={pdf} />;
}