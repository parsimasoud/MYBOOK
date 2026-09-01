

import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);

  const word = searchParams.get("word");

  if (!word) {
    return NextResponse.json(
      { error: "Word is required" },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(
      `https://englishdictionaryapi.com/api/v1/words/${encodeURIComponent(
        word
      )}`
    );

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: "Word not found" },
        { status: response.status }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Dictionary API Error:", error);

    return NextResponse.json(
      { error: "Failed to fetch dictionary API" },
      { status: 500 }
    );
  }
}




// import { NextResponse } from "next/server";

// export async function GET(request) {
//   const { searchParams } = new URL(request.url);

//   const word = searchParams.get("word");

//   if (!word) {
//     return NextResponse.json(
//       { error: "Word is required" },
//       { status: 400 }
//     );
//   }

//   try {
//     const response = await fetch(
//       `https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(
//         word
//       )}`
//     );

//     const data = await response.json();

//     if (!response.ok) {
//       return NextResponse.json(
//         { error: "Word not found" },
//         { status: response.status }
//       );
//     }

//     return NextResponse.json(data);
//   } catch (error) {
//     console.error("Dictionary API Error:", error);

//     return NextResponse.json(
//       { error: "Failed to fetch dictionary API" },
//       { status: 500 }
//     );
//   }
// }