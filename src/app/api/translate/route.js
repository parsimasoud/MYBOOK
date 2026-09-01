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
    const url =
      `https://api.mymemory.translated.net/get` +
      `?q=${encodeURIComponent(word)}` +
      `&langpair=en|fa`;

    const response = await fetch(url);

    const data = await response.json();

    console.log("TRANSLATION:", data);

    return NextResponse.json(data);
  } catch (error) {
    console.error("TRANSLATION ERROR:", error);

    return NextResponse.json(
      {
        error: "Translation failed",
        details: error.message,
      },
      { status: 500 }
    );
  }
}