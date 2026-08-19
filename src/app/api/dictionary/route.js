import connectDB from "@/lib/mongodb";
import Dictionary from "@/models/Dictionary";


export async function GET(req) {

  try {

    await connectDB();


    const { searchParams } = new URL(req.url);

    const word = searchParams.get("word");


    if (!word) {
      return Response.json({
        result: null
      });
    }


    const dictionary = await Dictionary.findOne({
      word: word.toLowerCase()
    });


    return Response.json({
      result: dictionary
    });


  } catch (error) {

    console.log(error);

    return Response.json(
      {
        error: error.message
      },
      {
        status: 500
      }
    );

  }

}