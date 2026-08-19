





"use client";

import { useEffect, useState } from "react";

export default function WordPopup({
  selectedWord,
  setSelectedWord
}) {

  const [meaning, setMeaning] = useState(null);
  const [loading, setLoading] = useState(false);


  useEffect(() => {

    if (!selectedWord) return;
  
  
    setLoading(true);
    setMeaning(null);
  
  
    fetch(`/api/dictionary?word=${selectedWord}`)
      .then(res => res.json())
      .then(data => {
        setMeaning(data.result);
      })
      .finally(() => {
        setLoading(false);
      });
  
  
  }, [selectedWord]);



  return (
    <div
      className="
        fixed
        inset-0
        z-50
        bg-black/40
        flex
        items-center
        justify-center
      "
      onClick={() => setSelectedWord(null)}
    >

      <div
        className="
          bg-blue-800
          text-white
          rounded-2xl
          w-80
          p-6
        "
        onClick={(e) => e.stopPropagation()}
      >

        <h2 className="text-xl font-bold mb-4">
          {selectedWord}
        </h2>


       
        {
        loading ? (

          <p>
            Loading...
          </p>

        ) : meaning ? (

<>

  <p className="mb-3">
    Meaning:
    <br />

    {meaning.meanings.map((item, index) => (
      <span key={index}>
        {item}
        <br />
      </span>
    ))}

  </p>


  <p>
    Example:
    <br />

    {meaning.examples.map((item, index) => (
      <span key={index}>
        {item}
        <br />
      </span>
    ))}

  </p>

</>

) : (

<p>
  No meaning found.
</p>

)}



        <button
          onClick={() => setSelectedWord(null)}
          className="
            mt-6
            bg-white
            text-black
            px-4
            py-2
            rounded-lg
          "
        >
          Close
        </button>


      </div>

    </div>
  );
}

// const dictionary = {
//   ground: {
//     meaning: "زمین",
//     example: "The ground is wet.",
//   },

//   hobbit: {
//     meaning: "هابیت",
//     example: "Bilbo is a hobbit.",
//   },

//   hole: {
//     meaning: "سوراخ",
//     example: "The rabbit lives in a hole.",
//   },

//   lived: {
//     meaning: "زندگی کرد",
//     example: "He lived in London.",
//   },
// };

// export default function WordPopup({ selectedWord, setSelectedWord }) {
//   const word = dictionary[selectedWord];

//   if (!word) {
//     return (
//       <div
//         className="fixed inset-0 bg-black/40 flex justify-center items-center"
//         onClick={() => setSelectedWord(null)}
//       >
//         <div
//           className="bg-blue-800 rounded-2xl w-80 p-6"
//           onClick={(e) => e.stopPropagation()}
//         >
//           <h2>{selectedWord}</h2>

//           <p>No meaning found.</p>

//           <button className="boreder-white" onClick={() => setSelectedWord(null)}>Close</button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div
//       className="fixed inset-0 bg-black/40 flex justify-center items-center"
//       onClick={() => setSelectedWord(null)}
//     >
//       <div
//         className="bg-blue-800 rounded-2xl w-80 p-6"
//         onClick={(e) => e.stopPropagation()}
//       >
//         <h2>{selectedWord}</h2>

//         <p>{word.meaning}</p>

//         <p>{word.example}</p>

//         <button
//           onClick={() => setSelectedWord(null)}
//           className="mt-6 bg-blue-800 text-white px-4 py-2 rounded-lg"
//         >
//           Close
//         </button>
//       </div>
//     </div>
//   );
// }

