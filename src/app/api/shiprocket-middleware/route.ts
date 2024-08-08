import { NextResponse } from "next/server";
import axios from "axios";
// let jwt = require("jsonwebtoken");
// const URI: any = process.env.MONGOOSE_URI;
export async function POST(req: Request) {
  try {
    const parsedData = await req.json();
    const { merchantID, data } = parsedData;
    // const credentials = {
    //   email: "marketing@triocomet.com",
    //   password: "ivHSFughsyt457e@Y%$@#&I#",
    // };

    // const headers = {
    //   "Content-Type": "application/json;charset=UTF-8",
    //   "Access-Control-Allow-Origin": "*",
    // };

    const res = await axios.post(
      "https://apiv2.shiprocket.in/v1/external/orders/create/adhoc",
      data,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer " +
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjQ4MTAyMjUsInNvdXJjZSI6InNyLWF1dGgtaW50IiwiZXhwIjoxNzIzNjM4NDAxLCJqdGkiOiJoSmFvZVFwSzUzbmVvM1pwIiwiaWF0IjoxNzIyNzc0NDAxLCJpc3MiOiJodHRwczovL3NyLWF1dGguc2hpcHJvY2tldC5pbi9hdXRob3JpemUvdXNlciIsIm5iZiI6MTcyMjc3NDQwMSwiY2lkIjo0NTc5NTA4LCJ0YyI6MzYwLCJ2ZXJib3NlIjpmYWxzZSwidmVuZG9yX2lkIjowLCJ2ZW5kb3JfY29kZSI6IiJ9.MBtbiMQ9L0V1jktVr5zjqDgey5-sQ0jdRZpXhBoS3l8",
        },
      }
    );
    if (res.status === 200) {
      return NextResponse.json(
        {
          message: "Your Product Order Successfully",
          success: true,
          data: res.data,
        },
        { status: 201 }
      );
    }
    return NextResponse.json(
      { message: "Order Failed", success: false },
      { status: 400 }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "Internal server error", success: false },
      { status: 500 }
    );
  }
}
