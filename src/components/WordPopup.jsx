
"use client";

import { useState } from "react";

export default function WordPopup({ selectedWord, setSelectedWord }) {
  const [meaning, setMeaning] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showMeaning, setShowMeaning] = useState(false);
  const [language, setLanguage] = useState(null);

  // =========================
  // English
  // =========================
  async function handleEnglish() {
    if (!selectedWord) return;

    setLanguage("english");
    setShowMeaning(true);
    setLoading(true);
    setMeaning(null);

    try {
      const response = await fetch(
        `/api/dictionary?word=${encodeURIComponent(selectedWord)}`
      );

      const data = await response.json();

      console.log("DICTIONARY RESULT:", data);

      if (!response.ok) {
        setMeaning(null);
        return;
      }

      setMeaning(data);
    } catch (error) {
      console.error("DICTIONARY ERROR:", error);
      setMeaning(null);
    } finally {
      setLoading(false);
    }
  }

  // =========================
  // Persian
  // =========================
  async function handlePersian() {
    if (!selectedWord) return;

    setLanguage("persian");
    setShowMeaning(true);
    setLoading(true);
    setMeaning(null);

    try {
      const response = await fetch(
        `/api/translate?word=${encodeURIComponent(selectedWord)}`
      );

      const data = await response.json();

      console.log("PERSIAN RESULT:", data);

      if (!response.ok) {
        setMeaning(null);
        return;
      }

      setMeaning({
        translation: data.responseData?.translatedText,
      });
    } catch (error) {
      console.error("PERSIAN ERROR:", error);
      setMeaning(null);
    } finally {
      setLoading(false);
    }
  }

  // =========================
  // Close
  // =========================
  function handleClose() {
    setSelectedWord(null);
    setLoading(false);
    setMeaning(null);
    setShowMeaning(false);
    setLanguage(null);
  }

  // =========================
  // Render
  // =========================
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
        p-2
      "
      onClick={handleClose}
    >
      <div
        className="
          flex
          flex-col
          bg-blue-800
          text-white
          rounded-2xl
          w-80
          max-w-[calc(100vw-1rem)]
          max-h-[calc(100dvh-1rem)]
          p-6

          landscape:max-h-[calc(100dvh-0.5rem)]
          landscape:p-4
        "
        onClick={(e) => e.stopPropagation()}
      >
        {/* Word */}
        <h2
          className="
            text-xl
            font-bold
            mb-4
            text-center
            shrink-0

            landscape:text-lg
            landscape:mb-2
          "
        >
          {selectedWord}
        </h2>

        {/* English Button */}
        <button
          className="
            bg-amber-50
            rounded-2xl
            p-2
            m-1
            hover:scale-105
            text-black
            shrink-0

            landscape:p-1.5
            landscape:m-0.5
          "
          onClick={handleEnglish}
        >
          English
        </button>

        {/* Persian Button */}
        <button
          className="
            bg-amber-50
            rounded-2xl
            p-2
            m-1
            hover:scale-105
            text-black
            shrink-0

            landscape:p-1.5
            landscape:m-0.5
          "
          onClick={handlePersian}
        >
          پارسی
        </button>

        {/* Result */}
        {showMeaning && (
          <div
            className="
              mt-4
              flex-1
              min-h-0
              overflow-y-auto
              pr-3
              dictionary-scroll

              landscape:mt-2
            "
          >
            {/* Loading */}
            {loading ? (
              <p className="text-center">
                Loading...
              </p>
            ) : meaning ? (
              /* =========================
                 English
                 ========================= */
              language === "english" ? (
                <div>
                  {/* Word */}
                  <p className="text-2xl font-bold mb-4">
                    {meaning.word}
                  </p>

                  {/* Pronunciation */}
                  {meaning.pronunciation?.ipa && (
                    <p className="mb-4 text-gray-200">
                      🔊 {meaning.pronunciation.ipa}
                    </p>
                  )}

                  {/* Parts of Speech */}
                  {meaning.partsOfSpeech?.map(
                    (part, index) => (
                      <div
                        key={index}
                        className="mb-5"
                      >
                        {/* Part of speech */}
                        <p className="font-bold text-amber-200 mb-2">
                          {part.partOfSpeech}
                        </p>

                        {/* Senses */}
                        {part.senses
                          ?.slice(0, 3)
                          .map((sense, senseIndex) => (
                            <div
                              key={senseIndex}
                              className="mb-4"
                            >
                              {/* Definition */}
                              <p className="leading-7">
                                <span className="font-bold">
                                  {senseIndex + 1}.{" "}
                                </span>

                                {sense.definition}
                              </p>

                              {/* Example */}
                              {sense.example && (
                                <p className="mt-2 text-sm text-gray-200 italic">
                                  “{sense.example}”
                                </p>
                              )}
                            </div>
                          ))}
                      </div>
                    )
                  )}
                </div>
              ) : (
                /* =========================
                   Persian
                   ========================= */
                <div className="flex items-center justify-center">
                  <p className="mb-4 text-xl">
                    <strong>معنی:</strong>
                    <br />

                    {meaning.translation ||
                      "ترجمه پیدا نشد."}
                  </p>
                </div>
              )
            ) : (
              /* No Result */
              <p className="text-center">
                No meaning found.
              </p>
            )}
          </div>
        )}

        {/* Close */}
        <button
          onClick={handleClose}
          className="
            mt-6
            bg-white
            text-black
            px-2
            py-1
            rounded-lg
            hover:scale-105
            shrink-0

            landscape:mt-2
            landscape:py-1
          "
        >
          Close
        </button>
      </div>
    </div>
  );
}


// "use client";

// import { useState } from "react";

// export default function WordPopup({ selectedWord, setSelectedWord }) {
//   const [meaning, setMeaning] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [showMeaning, setShowMeaning] = useState(false);
//   const [language, setLanguage] = useState(null);

//   // =========================
//   // English
//   // =========================
//   async function handleEnglish() {
//     if (!selectedWord) return;

//     setLanguage("english");
//     setShowMeaning(true);
//     setLoading(true);
//     setMeaning(null);

//     try {
//       const response = await fetch(
//         `/api/dictionary?word=${encodeURIComponent(selectedWord)}`
//       );

//       const data = await response.json();

//       console.log("DICTIONARY RESULT:", data);

//       if (!response.ok) {
//         setMeaning(null);
//         return;
//       }

//       setMeaning(data);
//     } catch (error) {
//       console.error("DICTIONARY ERROR:", error);
//       setMeaning(null);
//     } finally {
//       setLoading(false);
//     }
//   }

//   // =========================
//   // Persian
//   // =========================
//   async function handlePersian() {
//     if (!selectedWord) return;

//     setLanguage("persian");
//     setShowMeaning(true);
//     setLoading(true);
//     setMeaning(null);

//     try {
//       const response = await fetch(
//         `/api/translate?word=${encodeURIComponent(selectedWord)}`
//       );

//       const data = await response.json();

//       console.log("PERSIAN RESULT:", data);

//       if (!response.ok) {
//         setMeaning(null);
//         return;
//       }

//       setMeaning({
//         translation: data.responseData?.translatedText,
//       });
//     } catch (error) {
//       console.error("PERSIAN ERROR:", error);
//       setMeaning(null);
//     } finally {
//       setLoading(false);
//     }
//   }

//   // =========================
//   // Close
//   // =========================
//   function handleClose() {
//     setSelectedWord(null);
//     setLoading(false);
//     setMeaning(null);
//     setShowMeaning(false);
//     setLanguage(null);
//   }

//   // =========================
//   // Render
//   // =========================
//   return (
//     <div
//       className="
//         fixed
//         inset-0
//         z-50
//         bg-black/40
//         flex
//         items-center
//         justify-center
//       "
//       onClick={handleClose}
//     >
//       <div
//         className="
//           flex
//           flex-col
//           bg-blue-800
//           text-white
//           rounded-2xl
//           w-80
//           max-h-[90vh]
//           p-6
//         "
//         onClick={(e) => e.stopPropagation()}
//       >
//         {/* Word */}
//         <h2 className="text-xl font-bold mb-4 text-center">
//           {selectedWord}
//         </h2>

//         {/* English Button */}
//         <button
//           className="
//             bg-amber-50
//             rounded-2xl
//             p-2
//             m-1
//             hover:scale-105
//             text-black
//           "
//           onClick={handleEnglish}
//         >
//           English
//         </button>

//         {/* Persian Button */}
//         <button
//           className="
//             bg-amber-50
//             rounded-2xl
//             p-2
//             m-1
//             hover:scale-105
//             text-black
//           "
//           onClick={handlePersian}
//         >
//           پارسی
//         </button>

//         {/* Result */}
//         {showMeaning && (
//           // <div className="mt-4 max-h-[55vh] overflow-y-auto">
//           <div
//   className="
//     mt-4
//     max-h-[55vh]
//     overflow-y-auto
//     pr-3
//     dictionary-scroll
//   "
// >

//             {/* Loading */}
//             {loading ? (
//               <p className="text-center">
//                 Loading...
//               </p>
//             ) : meaning ? (

//               /* =========================
//                  English
//                  ========================= */
//               language === "english" ? (
//                 <div>

//                   {/* Word */}
//                   <p className="text-2xl font-bold mb-4">
//                     {meaning.word}
//                   </p>

//                   {/* Pronunciation */}
//                   {meaning.pronunciation?.ipa && (
//                     <p className="mb-4 text-gray-200">
//                       🔊 {meaning.pronunciation.ipa}
//                     </p>
//                   )}

//                   {/* Parts of Speech */}
//                   {meaning.partsOfSpeech?.map(
//                     (part, index) => (
//                       <div
//                         key={index}
//                         className="mb-5"
//                       >
//                         {/* Part of speech */}
//                         <p className="font-bold text-amber-200 mb-2">
//                           {part.partOfSpeech}
//                         </p>

//                         {/* Senses */}
//                         {part.senses?.slice(0, 3).map(
//                           (sense, senseIndex) => (
//                             <div
//                               key={senseIndex}
//                               className="mb-4"
//                             >
//                               {/* Definition */}
//                               <p className="leading-7">
//                                 <span className="font-bold">
//                                   {senseIndex + 1}.{" "}
//                                 </span>

//                                 {sense.definition}
//                               </p>

//                               {/* Example */}
//                               {sense.example && (
//                                 <p className="mt-2 text-sm text-gray-200 italic">
//                                   “{sense.example}”
//                                 </p>
//                               )}
//                             </div>
//                           )
//                         )}
//                       </div>
//                     )
//                   )}

//                 </div>
//               ) : (

//                 /* =========================
//                    Persian
//                    ========================= */
//                 <div className="flex items-center justify-center">
//                   <p className="mb-4 text-xl  ">
//                     <strong>معنی:</strong>
//                     <br />

//                     {meaning.translation ||
//                       "ترجمه پیدا نشد."}
//                   </p>
//                 </div>
//               )

//             ) : (

//               /* No Result */
//               <p className="text-center">
//                 No meaning found.
//               </p>
//             )}
//           </div>
//         )}

//         {/* Close */}
//         <button
//           onClick={handleClose}
//           className="
//             mt-6
//             bg-white
//             text-black
//             px-4
//             py-2
//             rounded-lg
//             hover:scale-105
//           "
//         >
//           Close
//         </button>
//       </div>
//     </div>
//   );
// }