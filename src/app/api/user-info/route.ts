import { NextResponse } from "next/server";
import { User } from "../../../../models/user";
import { otpSchema } from "../../../../models/otp";
import { headers } from "next/headers";
import mongoose from "mongoose";
let jwt = require("jsonwebtoken");
const key = process.env.JWT_KEY;

const URI: any = process.env.MONGOOSE_URI;
export async function POST(req: Request) {
  try {
    await mongoose.connect(URI);
    const headersList = headers();
    const auth = headersList.get("authorization");
    const parsedData = await req.json();
    if (auth && auth.startsWith("Bearer")) {
      const token = auth.substring(7);
      const tokenValue = await jwt.verify(token, key);
      if (parsedData.email) {
        const isUserExist = await User.find({ number: tokenValue.data.number });
        if (isUserExist.length === 1) {
          const updated = await User.updateOne(
            { number: tokenValue.data.number },
            { email: parsedData.email }
          );
          if (updated.acknowledged) {
            return NextResponse.json(
              { message: "Email update sucessfully", success: true },
              { status: 201 }
            );
          }
          return NextResponse.json(
            { message: "Email is not Update", success: false },
            { status: 500 }
          );
        }
      }

      if (parsedData.profileImage) {
        const isUserExist = await User.find({ number: tokenValue.data.number });
        if (isUserExist.length === 1) {
          const updated = await User.updateOne(
            { number: tokenValue.data.number },
            { profileImage: parsedData.profileImage }
          );
          if (updated.acknowledged) {
            return NextResponse.json(
              { message: "Profile image update sucessfully", success: true },
              { status: 201 }
            );
          }
          return NextResponse.json(
            { message: "Profile image is not Update", success: false },
            { status: 500 }
          );
        }
      }

      if (parsedData.address) {
        const isUserExist = await User.find({ number: tokenValue.data.number });
        if (isUserExist.length === 1) {
          const updated = await User.updateOne(
            { number: tokenValue.data.number },
            { address: parsedData.address }
          );
          if (updated.acknowledged) {
            return NextResponse.json(
              { message: "Address update sucessfully", success: true },
              { status: 201 }
            );
          }
          return NextResponse.json(
            { message: "Address is not Update", success: false },
            { status: 500 }
          );
        }
      }

      if (parsedData.name) {
        const isUserExist = await User.find({ number: tokenValue.data.number });
        if (isUserExist.length === 1) {
          const updated = await User.updateOne(
            { number: tokenValue.data.number },
            { name: parsedData.name }
          );
          if (updated.acknowledged) {
            return NextResponse.json(
              { message: "Name update sucessfully", success: true },
              { status: 201 }
            );
          }
          return NextResponse.json(
            { message: "Name is not Update", success: false },
            { status: 500 }
          );
        }
      }

      return NextResponse.json(
        { message: "please send proper data", success: false },
        { status: 500 }
      );
    } else {
      return NextResponse.json(
        { message: "unauthorized user", success: false },
        { status: 401 }
      );
    }
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: " Internal server error", success: false },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    await mongoose.connect(URI);
    const headersList = headers();
    const auth = headersList.get("authorization");
    if (auth && auth.startsWith("Bearer")) {
      const token = auth.substring(7);
      const tokenValue = await jwt.verify(token, key);

      const userData = await User.findOne({ number: tokenValue.data.number });
      if (userData) {
        return NextResponse.json(
          {
            message: "user data found successfully",
            data: userData,
            success: true,
          },
          { status: 200 }
        );
      }

      return NextResponse.json(
        { message: "user data not found", success: false },
        { status: 404 }
      );
    } else {
      return NextResponse.json(
        { message: "unauthorized user", success: false },
        { status: 401 }
      );
    }
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: " Internal server error", success: false },
      { status: 500 }
    );
  }
}
