import PDFViewerClient from "@/components/PDFViewerClient";

const books = {
  "secret-garden": "/The-Secret-Garden.pdf",
  "raya": "/raya and the last dragon.pdf",
  "harry": "/Book 1 - Harry Potter and the Sorcerers Stone.pdf",
  "hobbit": "/hobbit 1.pdf",
};

export default async function OfflineBook({ params }) {
  const { book } = await params;

  const pdf = books[book];

  return (
<div style={{ minHeight: "100vh", backgroundColor: "#f5f5f5" }}>
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "2rem",
          backgroundColor: "white",
          minHeight: "100vh",
        }}
      >      

      <p className="text-black">Book: {book}</p>

      <PDFViewerClient pdf={pdf} />
    </div>
</div>    
  );
}