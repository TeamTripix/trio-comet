import { NextRequest, NextResponse } from "next/server";
import { categorySchema } from "../../../../models/category";
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
          const { id, name, image } = parsedData;

          // check all feilds in requested data
          if (!name && !categorySchema && !image) {
            return NextResponse.json(
              { message: "please fill all feilds", success: false },
              { status: 400 }
            );
          }

          const updateCategory = await categorySchema.findOneAndUpdate(
            { id: id },
            { name: name, image: image }
          );
          if (updateCategory !== null) {
            return NextResponse.json(
              { message: "category update successfully", success: true },
              { status: 200 }
            );
          }

          // set data to save form the database
          const data = new categorySchema({
            id,
            name,
            image,
            addUserBy: tokenValue.data._id,
            isAdmin: tokenValue.data.isAdmin,
          });
          try {
            const response = await data.save();
            return NextResponse.json(
              { message: "category add successfully", success: true },
              { status: 200 }
            );
          } catch (err) {
            console.log(err);
            return NextResponse.json(
              { message: "category not saved", success: false },
              { status: 404 }
            );
          }
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
  const categoryId = req.nextUrl.searchParams.get("cid");
  try {
    await mongoose.connect(URI);
    try {
      if (categoryId) {
        const response = await categorySchema.find({ _id: categoryId });
        return NextResponse.json(
          {
            message: "category found successfully",
            data: response,
            success: true,
          },
          { status: 200 }
        );
      } else {
        const response = await categorySchema.find();
        return NextResponse.json(
          {
            message: "category found successfully",
            data: response,
            success: true,
          },
          { status: 200 }
        );
      }
    } catch (err) {
      console.log(err);
      return NextResponse.json(
        { message: "category not found", success: false },
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
          const { id } = parsedData;

          // check all feilds in requested data
          if (!id) {
            return NextResponse.json(
              { message: "please fill all feilds", success: false },
              { status: 400 }
            );
          }
          try {
            const response = await categorySchema.deleteOne({ _id: id });
            return NextResponse.json(
              {
                message: "product delete successfully",
                success: true,
                response,
              },
              { status: 200 }
            );
          } catch (err) {
            console.log(err);
            return NextResponse.json(
              { message: "product not delete", success: false },
              { status: 404 }
            );
          }
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
