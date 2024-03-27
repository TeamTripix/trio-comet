import { NextResponse } from "next/server";
import { productSchema } from "../../../../models/product";
import { headers } from "next/headers";
import { NextRequest } from "next/server";

import mongoose from "mongoose";
let jwt = require("jsonwebtoken");
const key = process.env.JWT_KEY;

const URI: any = process.env.MONGOOSE_URI;

export async function POST(req: Request) {
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
          const {
            id,
            name,
            description,
            price,
            discountPrice,
            quantity,
            isSale,
            offerTag,
            specification,
            productColor,
            category,
            descImage,
            specificationItems,
          } = parsedData;
          // check all feilds in requested data
          if (
            !name &&
            !description &&
            !price &&
            !discountPrice &&
            !quantity &&
            !isSale &&
            !offerTag &&
            !specification &&
            !productColor &&
            !category &&
            !descImage &&
            !specificationItems
          ) {
            return NextResponse.json(
              { message: "please fill all feilds", success: false },
              { status: 400 }
            );
          }

          if (id !== "") {
            const updateProduct = await productSchema.findOneAndUpdate(
              { _id: id },
              {
                name,
                description,
                price,
                discountPrice,
                quantity,
                isSale,
                offerTag,
                specification,
                productColor,
                category,
                descImage,
                specificationItems,
              }
            );
            if (updateProduct !== null) {
              return NextResponse.json(
                { message: "product update successfully", success: true },
                { status: 200 }
              );
            }
          }
          // set data to save form the database
          const data = new productSchema(
            {
              name,
              description,
              price,
              discountPrice,
              quantity,
              isSale,
              offerTag,
              specification,
              productColor,
              category,
              descImage,
              specificationItems,
            },
            // { expireAfterSeconds: 10 }
          );
          try {
            const response = await data.save();
            return NextResponse.json(
              { message: "product add successfully", success: true },
              { status: 200 }
            );
          } catch (err) {
            console.log(err);
            return NextResponse.json(
              { message: "product not saved", success: false },
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

export async function GET(
  req: NextRequest,
  { params }: { params: { filename: string } }
) {
  const pid = req.nextUrl.searchParams.get("pid");
  const tag = req.nextUrl.searchParams.get("tag");
  const category = req.nextUrl.searchParams.get("category");
  const onSale = req.nextUrl.searchParams.get("on-sale");
  try {
    await mongoose.connect(URI);
    try {
      if (pid) {
        const response = await productSchema.find({ _id: pid });
        return NextResponse.json(
          {
            message: "product found successfully",
            data: response,
            success: true,
          },
          { status: 200 }
        );
      } else if (onSale) {
        const response = await productSchema.find({
          isSale: true,
        });
        return NextResponse.json(
          {
            message: "product found successfully",
            data: response,
            success: true,
          },
          { status: 200 }
        );
      } else if (tag) {
        const response = await productSchema.find({
          offerTag: tag,
        });
        return NextResponse.json(
          {
            message: "product found successfully",
            data: response,
            success: true,
          },
          { status: 200 }
        );
      } else if (category) {
        const response = await productSchema.find({ category: category });
        return NextResponse.json(
          {
            message: "product found successfully",
            data: response,
            success: true,
          },
          { status: 200 }
        );
      } else {
        const response = await productSchema.find();
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
        const response = await productSchema.deleteOne({ _id: id });
        return NextResponse.json(
          { message: "product delete successfully", success: true, response },
          { status: 200 }
        );
      } catch (err) {
        console.log(err);
        return NextResponse.json(
          { message: "product not delete", success: false },
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
