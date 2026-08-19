"use client";

import { useEffect, useState } from "react";
import WordPopup from "../components/WordPopup";
import tokenize from "../utils/tokenize";

const punctuation = [".", ",", "!", "?", ";", ":", "-"];

export default function BookText({ page,  bookId,  chapterId, }) {
  const [selectedWord, setSelectedWord] = useState(null);
  useEffect(() => {

    async function saveProgress() {
  
      await fetch("/api/progress", {
  
        method: "POST",
  
        headers: {
          "Content-Type": "application/json",
        },
  
        body: JSON.stringify({
  
          bookId,
          chapterId,
          pageNumber: page.pageNumber,
  
        }),
  
      });
  
    }
  
    saveProgress();
  
  }, [bookId, chapterId, page.pageNumber]);

  if (!page) {
    return <div>Page not found</div>;
  }


  function handleWordClick(word, id) {

    console.log("Clicked:", word);

    setSelectedWord({
      word,
      id,
    });
  }


  return (
    <div className="max-w-4xl mx-auto text-2xl leading-loose text-justify px-4">
      <h1>page: {page.pageNumber}</h1>

      {page.content.map((block, blockIndex) => {


        if (block.type === "paragraph") {


          const tokens = tokenize(block.text);


          return (
            <p key={blockIndex} className="mb-6">
              

              {tokens.map((token, index) => {


                const isPunctuation = punctuation.includes(token.text);

                const wordId = `${blockIndex}-${index}`;


                return (

                  <span key={wordId}>


                    {isPunctuation ? (

                      <span>
                        {token.text}
                      </span>


                    ) : (


                      <span
                        onClick={() =>
                          handleWordClick(
                            token.text,
                            wordId
                          )
                        }
                        className={`
                          inline-block
                          rounded
                          cursor-pointer
                          transition-colors
                          hover:bg-blue-800
                          ${
                            selectedWord?.id === wordId
                              ? "bg-yellow-400 text-black"
                              : ""
                          }
                        `}
                      >

                        {token.text}

                      </span>

                    )}


                    {token.spaceAfter && " "}


                  </span>

                );

              })}


            </p>
          );

        }



        if (block.type === "image") {

          return (

            <div
              key={blockIndex}
              className="my-8"
            >

              <img
                src={block.src}
                alt={block.caption || ""}
                className="rounded-xl mx-auto"
              />


              {block.caption && (

                <p className="text-center text-sm text-gray-400 mt-2">
                  {block.caption}
                </p>

              )}


            </div>

          );

        }


        return null;


      })}



      {selectedWord && (

        <WordPopup

          selectedWord={selectedWord.word}

          setSelectedWord={setSelectedWord}

        />

      )}


    </div>
  );
}


// "use client";

// import { useState } from "react";
// import WordPopup from "../components/WordPopup";
// import tokenize from "../utils/tokenize";

// const punctuation = [".", ",", "!", "?", ";", ":", "-"];

// export default function BookText({ page }) {
//   const [selectedWord, setSelectedWord] = useState(null);

//   return (
//     <div className="max-w-3xl mx-auto text-2xl leading-loose text-justify px-4">
//       {page.content.map((block, blockIndex) => {
//         if (block.type === "paragraph") {
//           const tokens = tokenize(block.text);

//           return (
//             <p key={blockIndex} className="mb-6">
//               {tokens.map((token, index) => {
//                 const isPunctuation = punctuation.includes(token.text);

//                 return (
//                   <span key={index}>
//                     {isPunctuation ? (
//                       // علامت نگارشی
//                       <span>{token.text}</span>
//                     ) : (
//                       // کلمه
//                       <span
//                         onClick={() => setSelectedWord(token.text)}
//                         className={`
//                           inline-block
//                           rounded
//                           cursor-pointer
//                           transition-colors
//                           hover:bg-blue-800
//                           ${
//                             selectedWord === token.text
//                               ? "bg-yellow-400 text-black"
//                               : ""
//                           }
//                         `}
//                       >
//                         {token.text}
//                       </span>
//                     )}

//                     {token.spaceAfter && " "}
//                   </span>
//                 );
//               })}
//             </p>
//           );
//         }

//         if (block.type === "image") {
//           return (
//             <div key={blockIndex} className="my-8">
//               <img
//                 src={block.src}
//                 alt={block.caption}
//                 className="rounded-xl mx-auto"
//               />

//               {block.caption && (
//                 <p className="text-center text-sm text-gray-400 mt-2">
//                   {block.caption}
//                 </p>
//               )}
//             </div>
//           );
//         }

//         return null;
//       })}

//       {selectedWord && (
//         <WordPopup
//           selectedWord={selectedWord}
//           setSelectedWord={setSelectedWord}
//         />
//       )}
//     </div>
//   );
// }


// "use client";

// import { useState } from "react";
// import WordPopup from "../components/WordPopup";
// import tokenize from "../utils/tokenize";

// const punctuation = [".", ",", "!", "?", ";", ":", "-"];

// export default function BookText({ page }) {
//   const [selectedWord, setSelectedWord] = useState(null);

//   if (!page) {
//     return <div>Page not found</div>;
//   }

//   return (
//     <div className="max-w-4xl mx-auto text-2xl leading-loose text-justify px-4">

//       {page.content.map((block, blockIndex) => {

//         if (block.type === "paragraph") {

//           const tokens = tokenize(block.text);


//           return (
//             <p key={blockIndex} className="mb-6">

//               {tokens.map((token, index) => {

//                 const isPunctuation = punctuation.includes(token.text);

//                 const wordId = `${blockIndex}-${index}`;


//                 return (
//                   <span key={wordId}>

//                     {isPunctuation ? (

//                       <span>
//                         {token.text}
//                       </span>

//                     ) : (

//                       <span
//                         onClick={() =>
//                           setSelectedWord({
//                             word: token.text,
//                             id: wordId
//                           })
//                         }
//                         className={`
//                           inline-block
//                           rounded
//                           cursor-pointer
//                           transition-colors
//                           hover:bg-blue-800
//                           ${
//                             selectedWord?.id === wordId
//                               ? "bg-yellow-400 text-black"
//                               : ""
//                           }
//                         `}
//                       >
//                         {token.text}
//                       </span>

//                     )}


//                     {token.spaceAfter && " "}

//                   </span>
//                 );
//               })}

//             </p>
//           );
//         }


//         if (block.type === "image") {

//           return (
//             <div key={blockIndex} className="my-8">

//               <img
//                 src={block.src}
//                 alt={block.caption || ""}
//                 className="rounded-xl mx-auto"
//               />


//               {block.caption && (
//                 <p className="text-center text-sm text-gray-400 mt-2">
//                   {block.caption}
//                 </p>
//               )}

//             </div>
//           );
//         }


//         return null;

//       })}



//       {selectedWord && (
//         <WordPopup
//           selectedWord={selectedWord.word}
//           setSelectedWord={setSelectedWord}
//         />
//       )}

//     </div>
//   );
// }