import { NextRequest, NextResponse } from "next/server";
import { blogSchema } from "../../../../models/blog";
import { headers } from "next/headers";
import mongoose from "mongoose";
const jwt = require("jsonwebtoken");

const URI: any = process.env.MONGOOSE_URI;
const key = process.env.JWT_KEY;

export async function POST(req: NextRequest) {
  try {
    await mongoose.connect(URI);
    const headersList = headers();
    const auth = headersList.get("Authorization");
    if (auth && auth.startsWith("Bearer")) {
      const token = auth.substring(7);
      try {
        const tokenValue = await jwt.verify(token, key);
        if (
          tokenValue.data.role === "admin" ||
          tokenValue.data.role === "co-admin"
          ) {
            const parsedData = await req.json();
          const { heading, desc, banner, id } = parsedData;

          // check all feilds in requested data
          if (!heading && !desc && !banner) {
            return NextResponse.json(
              { message: "please fill all feilds", success: false },
              { status: 400 }
              );
            }
            if (id !== null) {
              const updateBlog = await blogSchema.findByIdAndUpdate(
              { _id: id },
              { heading: heading, banner: banner, desc: desc }
              );
              return NextResponse.json(
                { message: "Blog update successfully", success: true },
                { status: 201 }
                );
              }
              
          // set data to save form the database
          const data = new blogSchema({
            heading,
            desc,
            banner,
            addUserBy: tokenValue.data._id,
            isAdmin: tokenValue.data.role,
          });
          try {
            const response = await data.save();
            return NextResponse.json(
              { message: "blog add successfully", success: true },
              { status: 200 }
            );
          } catch (err) {
            console.log(err);
            return NextResponse.json(
              { message: "blog not saved", success: false },
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
  const blogId = req.nextUrl.searchParams.get("bid");
  try {
    await mongoose.connect(URI);
    try {
      if (blogId) {
        const response = await blogSchema.find({ _id: blogId });
        return NextResponse.json(
          {
            message: "blog found successfully",
            data: response,
            success: true,
          },
          { status: 200 }
        );
      } else {
        const response = await blogSchema.find();
        return NextResponse.json(
          {
            message: "blog found successfully",
            data: response,
            success: true,
          },
          { status: 200 }
        );
      }
    } catch (err) {
      console.log(err);
      return NextResponse.json(
        { message: "blog not found", success: false },
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
        const response = await blogSchema.deleteOne({
          _id: id,
        });
        if (response.deletedCount === 0) {
          return NextResponse.json(
            { message: "Blog not deleted ", success: false },
            { status: 200 }
          );
        }
        return NextResponse.json(
          { message: "Blog delete successfully", success: true, response },
          { status: 200 }
        );
      } catch (err) {
        console.log(err);
        return NextResponse.json(
          { message: "Blog not delete", success: false },
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
