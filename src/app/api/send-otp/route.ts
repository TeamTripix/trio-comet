import { NextRequest, NextResponse } from "next/server";
// import { User } from "../../../../models/user";
// import { otpSchema } from "../../../../models/otp";
// import mongoose from "mongoose";
// import { Twilio } from "twilio";
// let jwt = require("jsonwebtoken");

// const accountSid = process.env.TWILIO_ACCOUNT_SID;
// const authToken = process.env.TWILIO_AUTH_TOKEN;
// const twilioNumber = process.env.TWILIO_PHONE_NUMBER;
// const client = new Twilio(accountSid, authToken);

// const URI: any = process.env.MONGOOSE_URI;
export async function POST(req: Request) {
  // const generateRandomNumber = () => {
  //   let min = 100000;
  //   let max = 999999;
  //   return Math.floor(Math.random() * (max - min + 1)) + min;
  // };

  // try {
  //   await mongoose.connect(URI);
  //   const parsedData = await req.json();
    
  //   if (!parsedData.number) {
  //     return NextResponse.json(
  //       { message: "please fill all feilds", success: false },
  //       { status: 400 }
  //       );
  //     }
  //     const otpValue = generateRandomNumber();
  //     const findOTPInDB = await otpSchema.find({
  //       number: parsedData.number,
  //     });
      
  //     if (findOTPInDB.length === 1) {
  //       const OTPUpdateRes = await otpSchema.updateOne(
  //         { number: parsedData.number },
  //         { OTP: otpValue }
  //         );
  //         const sendOTPRes = await client.messages.create({
  //           from: twilioNumber,
  //           to: `+91${parsedData.number}`,
  //           body: `${otpValue} is your OTP to continue your TrioComet journey. Happy Shopping!`,
  //         });
          
  //     if (sendOTPRes.errorMessage === null) {
  //       return NextResponse.json(
  //         {
  //           message: "OTP update successfully",
  //           otp: otpValue,
  //           success: true,
  //         },
  //         { status: 200 }
  //       );
  //     } else {
  //       return NextResponse.json(
  //         {
  //           message: "OTP not update",
  //           otp: otpValue,
  //           success: false,
  //         },
  //         { status: 200 }
  //       );
  //     }
  //     // return NextResponse.json(
  //     //   {
  //     //     message: "OTP update successfully",
  //     //     otp: otpValue,
  //     //     success: true,
  //     //   },
  //     //   { status: 200 }
  //     // );
  //   } else {
  //     const OTP = new otpSchema({
  //       number: parsedData.number,
  //       OTP: otpValue,
  //     });

  //     const response = OTP.save();
  //     const sendOTPRes = await client.messages.create({
  //       from: twilioNumber,
  //       to: `+91${parsedData.number}`,
  //       body: `${otpValue} is your OTP to continue your TrioComet journey. Happy Shopping!`,
  //     });
  //     if (sendOTPRes.errorMessage === null) {
  //       return NextResponse.json(
  //         {
  //           message: "OTP send successfully",
  //           otp: otpValue,
  //           success: true,
  //         },
  //         { status: 200 }
  //       );
  //     } else {
  //       return NextResponse.json(
  //         {
  //           message: "OTP not send",
  //           otp: otpValue,
  //           success: false,
  //         },
  //         { status: 200 }
  //       );
  //     }
  //     // return NextResponse.json(
  //     //   {
  //     //     message: "OTP send successfully",
  //     //     otp: otpValue,
  //     //     success: true,
  //     //   },
  //     //   { status: 200 }
  //     // );
  //   }
  // } catch (err:any) {
  //   return NextResponse.json(
  //     { message: "Internal server error", success: false },
  //     { status: 500 }
  //   );
  // }
    return NextResponse.json(
      { message: "Internal server error", success: false },
      { status: 500 }
    );
}

export async function GET(req: NextRequest) {
  // const generateRandomNumber = () => {
  //   let min = 100000;
  //   let max = 999999;
  //   return Math.floor(Math.random() * (max - min + 1)) + min;
  // };
  // const OTP = req.nextUrl.searchParams.get("OTP");
  // const number = req.nextUrl.searchParams.get("number");
  // try {
  //   await mongoose.connect(URI);

  //   if (!OTP || !number) {
  //     return NextResponse.json(
  //       { message: "please fill all feilds", success: false },
  //       { status: 400 }
  //     );
  //   }
  //   // const otpValue = generateRandomNumber();
  //   const findOTPInDB = await otpSchema.find({
  //     number: number,
  //     OTP: OTP,
  //   });

  //   if (findOTPInDB.length === 1) {
  //     const otpDelRes = await otpSchema.deleteOne({
  //       number: number,
  //       OTP: OTP,
  //     });
  //     return NextResponse.json(
  //       { message: "OTP verified", success: true },
  //       { status: 200 }
  //     );
  //     // const OTPUpdateRes = await otpSchema.updateOne(
  //     //   { number: parsedData.number },
  //     //   { OTP: otpValue }
  //     // );
  //     // const sendOTPRes = await client.messages.create({
  //     //   from: twilioNumber,
  //     //   to: `+91${parsedData.number}`,
  //     //   body: `Your RoyalMobisol verification code is: ${otpValue}`,
  //     // });
  //     // if (sendOTPRes.errorMessage === null) {
  //     //   return NextResponse.json(
  //     //     {
  //     //       message: "OTP update successfully",
  //     //       otp: otpValue,
  //     //       success: true,
  //     //     },
  //     //     { status: 200 }
  //     //   );
  //     // } else {
  //     //   return NextResponse.json(
  //     //     {
  //     //       message: "OTP not update",
  //     //       otp: otpValue,
  //     //       success: false,
  //     //     },
  //     //     { status: 200 }
  //     //   );
  //     // }
  //   } else {
  //     return NextResponse.json(
  //       { message: "Invalid OTP", success: false },
  //       { status: 200 }
  //     );
  //     // const OTP = new otpSchema({
  //     //   number: parsedData.number,
  //     //   OTP: otpValue,
  //     // });

  //     // const response = OTP.save();
  //     // const sendOTPRes = await client.messages.create({
  //     //   from: twilioNumber,
  //     //   to: `+91${parsedData.number}`,
  //     //   body: `Your RoyalMobisol verification code is: ${otpValue}`,
  //     // });
  //     // if (sendOTPRes.errorMessage === null) {
  //     //   return NextResponse.json(
  //     //     {
  //     //       message: "OTP send successfully",
  //     //       otp: otpValue,
  //     //       success: true,
  //     //     },
  //     //     { status: 200 }
  //     //   );
  //     // } else {
  //     //   return NextResponse.json(
  //     //     {
  //     //       message: "OTP not send",
  //     //       otp: otpValue,
  //     //       success: false,
  //     //     },
  //     //     { status: 200 }
  //     //   );
  //     // }
  //     // return NextResponse.json(
  //     //   {
  //     //     message: "OTP send successfully",
  //     //     otp: otpValue,
  //     //     success: true,
  //     //   },
  //     //   { status: 200 }
  //     // );
  //   }
  // } catch (err) {
  //   console.log(err);
  //   return NextResponse.json(
  //     { message: "Internal server error", success: false },
  //     { status: 500 }
  //   );
  // }
      return NextResponse.json(
      { message: "Internal server error", success: false },
      { status: 500 }
    );
}
