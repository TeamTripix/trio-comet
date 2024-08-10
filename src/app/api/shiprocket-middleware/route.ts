import { NextResponse } from "next/server";
import axios from "axios";
// let jwt = require("jsonwebtoken");
// const URI: any = process.env.MONGOOSE_URI;
export async function POST(req: Request) {
  try {
    const parsedData = await req.json();
    console.log("parsedDataaaa : ",parsedData)
    const { data, token } = parsedData;

    // if (shiprocketToken) {
    //   console.log("shiprocketToken : ",shiprocketToken )
    axios
      .post(
        "https://apiv2.shiprocket.in/v1/external/orders/create/adhoc",
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      )
      .then(function (response) {
        if (response.status === 200) {
          return NextResponse.json(
            {
              message: "Your Product Order Successfully",
              success: true,
              data: response.data,
            },
            { status: 201 }
          );
        }
        return NextResponse.json(
          { message: "Order Failed", success: false },
          { status: 400 }
        );
      })
      .catch(function (error) {
        console.log(error);
      });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "Internal server error", success: false },
      { status: 500 }
    );
  }
}
