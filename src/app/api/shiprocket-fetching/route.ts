import { NextResponse } from "next/server";
import axios from "axios";
// let jwt = require("jsonwebtoken");
// const URI: any = process.env.MONGOOSE_URI;
export async function POST(req: Request) {
  try {
    const parsedData = await req.json();
    const { url,token } = parsedData;

    // if (shiprocketToken) {
    //   console.log("shiprocketToken : ",shiprocketToken )
    const res = await axios.get(
      url,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );
    if (res.status === 200) {
      return NextResponse.json(
        {
          message: "Your Product fetch Successfully",
          success: true,
          data: res.data,
        },
        { status: res.status }
      );
    }
    return NextResponse.json(
      { message: "Failed", success: false },
      { status:  res.status }
    );
  } catch (err:any) {
    return NextResponse.json(
      { message: "Internal server error", success: false },
      { status: err.response.status }
    );
  }
}