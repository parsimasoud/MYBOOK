import Link from "next/link";
import Book from "../../../models/Book";
import connectDB from "../../../lib/mongodb";

// const books = [
//   {
//     title: "The Hobbit",
//     slug: "the-hobbit",
//     author: "J.R.R. Tolkien",
//     coverImage: "/books/hobbit/cover.jpg",
//     backgroundImage: "/books/hobbit/lmmap.jpg",
//     levelId: "level-1",
//     chaptersCount: 19,
//     description: "A fantasy novel about Bilbo Baggins.",
//     isPublished: true,
//   },
//   {
//     title: "Charlotte's Web",
//     slug: "charlottes-web",
//     author: "E.B. White",
//     coverImage: "/books/charlotte/cover.jpg",
//     backgroundImage: "/books/charlotte/background.jpg",
//     levelId: "level-2",
//     chaptersCount: 22,
//     description: "A story about friendship.",
//     isPublished: true,
//   },
//   {
//     title: "Harry Potter and the Sorcerer's Stone",
//     slug: "harry-potter-and-the-sorcerers-stone",
//     author: "J.K. Rowling",
//     coverImage: "/books/harry1/cover.jpg",
//     backgroundImage: "/books/harry1/background.jpg",
//     levelId: "level-3",
//     chaptersCount: 17,
//     description: "Harry discovers he is a wizard.",
//     isPublished: true,
//   },
//   {
//     title: "The Great Gatsby",
//     slug: "the-great-gatsby",
//     author: "F. Scott Fitzgerald",
//     coverImage: "/books/gatsby/cover.jpg",
//     backgroundImage: "/books/gatsby/background.jpg",
//     levelId: "level-4",
//     chaptersCount: 9,
//     description: "A classic American novel.",
//     isPublished: true,
//   },
// ];


export default async function page({params}){
    await connectDB();

    const books = await Book.find();
    
    const {slug} =await params;
    
    const book = books.find(book => book.slug === slug);   

    return(
        <div className="flex flex-col  items-center text-center justify-center p-4 gap-4">
          <div className="flex justify-center">
          <img className="h-96 rounded-xl shadow-lg" src={book.coverImage} alt={book.title} />
          </div>
          <div className="flex flex-col w-100 text-center justify-center">
          <h1>{book.title}</h1>
          <h2>{book.author}</h2>
          <h2>chapters : {book.chaptersCount}</h2>
          <p >{book.description}</p>
          <Link href={`/books/${book.slug}/read`}><button className="bg-blue-400 p-3 rounded-2xl hover:bg-blue-700 hover:scale-105">start reading</button></Link>
          </div>
          

        </div>
    )
}