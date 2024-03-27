import { NextRequest, NextResponse } from "next/server";
import { bulkQuerySchema } from "../../../../models/bulkQuery";
import mongoose from "mongoose";

const URI: any = process.env.MONGOOSE_URI;

export async function POST(req: NextRequest) {
  try {
    await mongoose.connect(URI);
    try {
      const parsedData = await req.json();
      const { name, mobile, email, state, queryMessage } = parsedData;

      // check all feilds in requested data
      if (!name || !mobile || !email || !state || !queryMessage) {
        return NextResponse.json(
          { message: "please fill all feilds", success: false },
          { status: 400 }
        );
      }

      const data = new bulkQuerySchema({
        name,
        mobile,
        email,
        state,
        queryMessage,
      });
      try {
        const response = await data.save();
        return NextResponse.json(
          { message: "request sent successfully", success: true, response },
          { status: 200 }
        );
      } catch (err) {
        console.log(err);
        return NextResponse.json(
          { message: "request not sent", success: false },
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

export async function GET(req: NextRequest) {
  //   const pid = req.nextUrl.searchParams.get("id");
  try {
    await mongoose.connect(URI);
    try {
      const response = await bulkQuerySchema.find();

      return NextResponse.json(
        {
          message: "query message found successfully",
          data: response,
          success: true,
        },
        { status: 200 }
      );
    } catch (err) {
      console.log(err);
      return NextResponse.json(
        { message: "query message not found", success: false },
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
        const response = await bulkQuerySchema.deleteOne({ _id: id });
        return NextResponse.json(
          { message: "request delete successfully", success: true, response },
          { status: 200 }
        );
      } catch (err) {
        console.log(err);
        return NextResponse.json(
          { message: "request not delete", success: false },
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
