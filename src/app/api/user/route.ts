import { NextResponse } from "next/server";
import { User } from "../../../../models/user";
import { otpSchema } from "../../../../models/otp";
import mongoose from "mongoose";
let jwt = require("jsonwebtoken");
const URI: any = process.env.MONGOOSE_URI;
export async function POST(req: Request) {
  try {
    await mongoose.connect(URI);
    const parsedData = await req.json();

    if (!parsedData.number || !parsedData.OTP) {
      return NextResponse.json(
        { message: "please fill all feilds", success: false },
        { status: 400 }
      );
    }

    const data = new User({
      number: parsedData.number,
    });
    try {
      const isUserAlreadyExist = await User.find({ number: parsedData.number });
      if (isUserAlreadyExist.length === 0) {
        const OTPSendResponse = await otpSchema.find({
          number: parsedData.number,
          OTP: parsedData.OTP,
        });

        if (OTPSendResponse.length === 1) {
          const response = await data.save();
          const otpDelRes = await otpSchema.deleteOne({
            number: parsedData.number,
            OTP: parsedData.OTP,
          });

          return NextResponse.json(
            { message: "Your account has been created", status: true },
            { status: 200 }
          );
        } else {
          return NextResponse.json(
            { message: "Invalid OTP", success: false },
            { status: 200 }
          );
        }
      } else {
        const OTPSendResponse = await otpSchema.find({
          number: parsedData.number,
          OTP: parsedData.OTP,
        });

        if (OTPSendResponse.length === 1) {
          const token = await jwt.sign(
            {
              data: {
                number: parsedData.number,
              },
            },
            process.env.JWT_KEY
          );

          if (token) {
            const otpDelRes = await otpSchema.deleteOne({
              number: parsedData.number,
              OTP: parsedData.OTP,
            });
            return NextResponse.json(
              { message: "Login successfully", token, success: true },
              { status: 200 }
            );
          } else {
            return NextResponse.json(
              {
                message:
                  "token not generate properly please try after sometime",
                success: false,
              },
              { status: 200 }
            );
          }
        } else {
          return NextResponse.json(
            { message: "Invalid OTP", success: false },
            { status: 200 }
          );
        }
      }
    } catch (err) {
      console.log(err);
      return NextResponse.json(
        { message: "User not saved", success: false },
        { status: 404 }
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
