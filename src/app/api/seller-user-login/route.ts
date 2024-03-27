import { NextResponse } from "next/server";
import { SellerUser } from "../../../../models/sellerUser";
import mongoose from "mongoose";
let jwt = require("jsonwebtoken");

const URI: any = process.env.MONGOOSE_URI;
export async function POST(req: Request) {
  try {
    await mongoose.connect(URI);
    const parsedData = await req.json();

    if (!parsedData.username || !parsedData.password) {
      return NextResponse.json(
        { message: "please fill all feilds", success: false },
        { status: 400 }
      );
    }
    const response = await SellerUser.find({
      username: parsedData.username,
      password: parsedData.password,
    });

    if (response.length === 0) {
      return NextResponse.json(
        { message: "Incorrect username or password", success: false },
        { status: 200 }
      );
    } else {
      const token = await jwt.sign(
        {
          data: response[0],
        },
        process.env.JWT_KEY
      );

      if (token) {
        return NextResponse.json(
          {
            message: "Login successfully",
            data: response[0],
            token,
            success: true,
          },
          { status: 200 }
        );
      } else {
        return NextResponse.json(
          {
            message: "token not generate properly please try after sometime",
            success: false,
          },
          { status: 200 }
        );
      }
    }
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "Internal server error", success: false },
      { status: 500 }
    );
  }
}
