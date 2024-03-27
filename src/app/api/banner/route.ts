import { NextRequest, NextResponse } from "next/server";
import { bannerSchema } from "../../../../models/banner";
import { headers } from "next/headers";
import mongoose from "mongoose";
const jwt = require("jsonwebtoken");

const URI: any = process.env.MONGOOSE_URI;
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
          const { id, imageURL, link } = parsedData;

          // check all feilds in requested data
          if (!id && !imageURL && !link) {
            return NextResponse.json(
              { message: "please fill all feilds", success: false },
              { status: 400 }
            );
          }

          const isExist = await bannerSchema.find({ id: id });
          if (isExist.length === 0) {
            const data = new bannerSchema({
              id,
              imageURL,
              link,
              addUserBy: tokenValue.data._id,
              isAdmin: tokenValue.data.isAdmin,
            });
            try {
              const response = await data.save();
              return NextResponse.json(
                { message: "Banner add successfully", success: true },
                { status: 200 }
              );
            } catch (err) {
              console.log(err);
              return NextResponse.json(
                { message: "Banner not saved", success: false },
                { status: 404 }
              );
            }
          } else {
            const update = await bannerSchema.updateOne({
              imageURL: imageURL,
              link: link,
            });
            if (update.modifiedCount === 1) {
              return NextResponse.json(
                { message: "Banner update successfully", success: true },
                { status: 200 }
              );
            } else {
              return NextResponse.json(
                { message: "Banner not update", success: false },
                { status: 200 }
              );
            }
          }

          //   const updateCategory = await categorySchema.findOneAndUpdate(
          //     { id: id },
          //     { name: name, image: image }
          //   );
          //   if (updateCategory !== null) {
          //     return NextResponse.json(
          //       { message: "category update successfully", success: true },
          //       { status: 200 }
          //     );
          //   }

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
      const response = await bannerSchema.find();
      return NextResponse.json(
        {
          message: "Banner found successfully",
          data: response,
          success: true,
        },
        { status: 200 }
      );
    } catch (err) {
      console.log(err);
      return NextResponse.json(
        { message: "Banner not found", success: false },
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
        const response = await bannerSchema.deleteOne({ _id: id });
        return NextResponse.json(
          { message: "Banner delete successfully", success: true, response },
          { status: 200 }
        );
      } catch (err) {
        console.log(err);
        return NextResponse.json(
          { message: "Banner not delete", success: false },
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
