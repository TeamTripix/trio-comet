import { NextResponse } from "next/server";
import { productSchema } from "../../../../models/product";
import { headers } from "next/headers";
import { NextRequest } from "next/server";

import mongoose from "mongoose";

const URI: any = process.env.MONGOOSE_URI;

export async function GET(
  req: NextRequest,
  { params }: { params: { filename: string } }
) {
  const category = req.nextUrl.searchParams.get("category");
  var queries: any = req.nextUrl.searchParams.get("query");
  var regex = new RegExp(queries.toString(), "i");
  try {
    await mongoose.connect(URI);
    try {
      if (category !== "all") {
        const response = await productSchema.find({
          $and: [{ name: { $regex: regex } }, { category: category }],
        });
        return NextResponse.json(
          {
            message: "product found successfully",
            data: response,
            success: true,
          },
          { status: 200 }
        );
      } else {
        const response = await productSchema.find({ name: { $regex: regex } });
        return NextResponse.json(
          {
            message: "product found successfully",
            data: response,
            success: true,
          },
          { status: 200 }
        );
      }
    } catch (err) {
      console.log(err);
      return NextResponse.json(
        { message: "product not found", data: [], success: false },
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
