import { NextResponse } from "next/server";
import axios from "axios";
// let jwt = require("jsonwebtoken");
// const URI: any = process.env.MONGOOSE_URI;
export async function POST(req: Request) {
  try {
    const parsedData = await req.json();
    const { merchantID, data } = parsedData;
    const credentials = {
      email: "marketing@triocomet.com",
      password: "ivHSFughsyt457e@Y%$@#&I#",
    };

    const headers = {
      "Content-Type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
    };

    // if (merchantID) {
    //   console.log("------------------");
    //   axios({
    //     method: "post",
    //     url: "https://apiv2.shiprocket.in/v1/external/auth/login",
    //     data: { email: credentials.email, password: credentials.password },
    //   })
    //     .then((res) => {
    //       console.log("++++++++++++++++++++++");
    //       if (res.data.token) {
    //         console.log("dfdsf ", res.data.token);
            axios
              .post(
                "https://apiv2.shiprocket.in/v1/external/orders/create/adhoc",
                data,
                {
                  headers: {
                    'Content-Type': 'application/json',
                    Authorization: "Bearer " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjQ4MTAyMjUsInNvdXJjZSI6InNyLWF1dGgtaW50IiwiZXhwIjoxNzE5OTk1NTA0LCJqdGkiOiJQQzdKZkx4QW9EdTVENU1GIiwiaWF0IjoxNzE5MTMxNTA0LCJpc3MiOiJodHRwczovL3NyLWF1dGguc2hpcHJvY2tldC5pbi9hdXRob3JpemUvdXNlciIsIm5iZiI6MTcxOTEzMTUwNCwiY2lkIjo0NTc5NTA4LCJ0YyI6MzYwLCJ2ZXJib3NlIjpmYWxzZSwidmVuZG9yX2lkIjowLCJ2ZW5kb3JfY29kZSI6IiJ9.ED273Ng_DXqjqD4VSNGuquwvctrtWOze4TvnsoZbqZo"
                  },
                }
              )
              .then((res) => {
                console.log(res.data)
            return NextResponse.json(
              { message: "Your Product Order Successfully", success: true },
              { status: 201 }
            );
              })
              .catch((error) => {
                console.error("error : ", error);
                return NextResponse.json(
                  { message: "Order Failed", success: false },
                  { status: 400 }
                );
              });
          // }
        //   return NextResponse.json(
        //     { message: "Authentication failed", success: false },
        //     { status: 400 }
        //   );
        // })
        // .catch((error) => {
        //   console.error(error);
        //   return NextResponse.json(
        //     { message: "Order Fail", success: false },
        //     { status: 400 }
        //   );
        // });
    // }
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "Internal server error", success: false },
      { status: 500 }
    );
  }
}
