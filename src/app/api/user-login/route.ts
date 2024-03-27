import { NextResponse } from "next/server";
import { User } from "../../../../models/user";
import mongoose from "mongoose";
let jwt = require("jsonwebtoken");

const URI : any = process.env.MONGOOSE_URI
export async function POST(req: Request) {
  try {
   await mongoose.connect(URI);
    const parsedData = await req.json();

    if (!parsedData.number) {
      return NextResponse.json(
        { message: "please fill all feilds" },
        { status: 400 }
      );
    }
    const response = await User.find({
      number: parsedData.number,
    });

    if (response.length === 0) {
      return NextResponse.json(
        { message: "Incorrect username or password" },
        { status: 200 }
      );
    } else {
      const token = await jwt.sign(
        {
          data: {
            username: parsedData.username,
            password: parsedData.password,
            isAdmin: response[0].isAdmin,
          },
        },
        process.env.JWT_KEY
      );

      if (token) {
        return NextResponse.json(
          { message: "Login successfully", token },
          { status: 200 }
        );
      } else {
        return NextResponse.json(
          { message: "token not generate properly please try after sometime" },
          { status: 200 }
        );
      }
    }
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
