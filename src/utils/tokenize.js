// export default function tokenize(text) {
//     const tokens = [];
//     let currentWord = "";
  
//     const punctuation = [".", ",", "!", "?", ";", ":", "-"];
  
//     for (let char of text) {
//       // اگر فاصله بود
//       if (char === " ") {
//         if (currentWord !== "") {
//           tokens.push({
//             text: currentWord,
//             spaceAfter: true,
//           });
  
//           currentWord = "";
//         }
  
//         continue;
//       }
  
//       // اگر علامت نگارشی بود
//       if (punctuation.includes(char)) {
//         if (currentWord !== "") {
//           tokens.push({
//             text: currentWord,
//             spaceAfter: true,
//           });
  
//           currentWord = "";
//         }
  
//         // آخرین کلمه نباید قبل از علامت فاصله داشته باشد
//         if (tokens.length > 0) {
//           tokens[tokens.length - 1].spaceAfter = false;
//         }
  
//         // بعد از ویرگول فاصله داریم، بعد از نقطه نداریم
//         tokens.push({
//           text: char,
//           spaceAfter: char === ",",
//         });
  
//         continue;
//       }
  
//       // ساختن کلمه
//       currentWord += char;
//     }
  
//     // آخرین کلمه
//     if (currentWord !== "") {
//       tokens.push({
//         text: currentWord,
//         spaceAfter: false,
//       });
//     }
//     console.log(tokens);
//     return tokens;
//   }



export default function tokenize(text) {
  const tokens = [];
  let currentWord = "";

  const punctuation = [".", ",", "!", "?", ";", ":", "-"];

  for (let char of text) {

    // فاصله
    if (char === " ") {

      if (currentWord !== "") {
        tokens.push({
          text: currentWord,
          spaceAfter: true,
        });

        currentWord = "";
      }

      continue;
    }


    // علامت نگارشی
    if (punctuation.includes(char)) {

      if (currentWord !== "") {

        tokens.push({
          text: currentWord,
          spaceAfter: false,
        });

        currentWord = "";
      }


      tokens.push({
        text: char,
        spaceAfter: char !== "-",
      });


      continue;
    }


    currentWord += char;
  }


  // آخرین کلمه
  if (currentWord !== "") {

    tokens.push({
      text: currentWord,
      spaceAfter: false,
    });

  }


  return tokens;
}