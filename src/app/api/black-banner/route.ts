import { NextRequest, NextResponse } from "next/server";
import { blackBannerSchema } from "../../../../models/blackBanner";
import { headers } from "next/headers";
import mongoose from "mongoose";
const jwt = require("jsonwebtoken");

const URI: any = process.env.MONGOOSE_URI;
console.log("test :",URI)
const key = process.env.JWT_KEY;

export async function POST(req: NextRequest) {
  try {
    await mongoose.connect(URI);
    const headersList = headers();
    const auth = headersList.get("authorization");
    if (auth && auth.startsWith("Bearer")) {
      const token = auth.substring(7);
      try {
        const tokenValue = await jwt.verify(token, key);
        if (
          tokenValue.data.role === "admin" ||
          tokenValue.data.role === "co-admin"
        ) {
          const parsedData = await req.json();
          const { bannerText, bannerURL } = parsedData;

          // check all feilds in requested data
          if (!bannerText) {
            return NextResponse.json(
              { message: "please fill all feilds", success: false },
              { status: 400 }
            );
          }

          const findBannerText = await blackBannerSchema.find();
          if (findBannerText.length === 0) {
            const data = new blackBannerSchema({
              bannerText,
              bannerURL,
              addUserBy: tokenValue.data._id,
              isAdmin: tokenValue.data.role,
            });
            try {
              const response = await data.save();
              return NextResponse.json(
                { message: "banner add successfully", success: true },
                { status: 200 }
              );
            } catch (err) {
              console.log(err);
              return NextResponse.json(
                { message: "banner not saved", success: false },
                { status: 404 }
              );
            }
          } else {
            const updateBB = await blackBannerSchema.updateOne(
              { _id: findBannerText[0]._id },
              { bannerText: bannerText, bannerURL: bannerURL }
            );
            return NextResponse.json(
              { message: "black banner update", success: true },
              { status: 200 }
            );
          }

          // set data to save form the database
        } else {
          return NextResponse.json(
            { message: "permission denied", success: false },
            { status: 200 }
          );
        }
      } catch (err) {
        return NextResponse.json(
          { message: "unauthorized user", success: false },
          { status: 401 }
        );
      }
    } else {
      return NextResponse.json(
        { message: "unauthorized user", success: false },
        { status: 401 }
      );
    }
  } catch (err) {
    console.log(err);

    return NextResponse.json(
      { message: "Internal server error", success: false },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    await mongoose.connect(URI);
    try {
      const response = await blackBannerSchema.find();
      return NextResponse.json(
        {
          message: "black banner found successfully",
          data: response,
          success: true,
        },
        { status: 200 }
      );
    } catch (err) {
      console.log(err);
      return NextResponse.json(
        { message: "black banner not found", success: false },
        { status: 404 }
      );
    }
  } catch (err) {
    console.log(err);

    return NextResponse.json(
      { message: "Internal server error", success: false },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    await mongoose.connect(URI);
    try {
      const parsedData = await req.json();
      const { id } = parsedData;

      // check all feilds in requested data
      if (!id) {
        return NextResponse.json(
          { message: "please fill all feilds", success: false },
          { status: 400 }
        );
      }
      try {
        const response = await blackBannerSchema.deleteOne({
          _id: id,
        });
        if (response.deletedCount === 0) {
          return NextResponse.json(
            { message: "Black banner not deleted", success: false },
            { status: 200 }
          );
        }
        return NextResponse.json(
          {
            message: "Black banner delete successfully",
            success: true,
            response,
          },
          { status: 200 }
        );
      } catch (err) {
        console.log(err);
        return NextResponse.json(
          { message: "Black banner not deleted", success: false },
          { status: 404 }
        );
      }
      //   }
    } catch (err) {
      console.log(err);
      return NextResponse.json(
        { message: "server error", success: false },
        { status: 500 }
      );
    }
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "Internal server error", success: false },
      { status: 500 }
    );
  }
}
