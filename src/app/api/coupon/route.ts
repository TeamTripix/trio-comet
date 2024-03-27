import { NextRequest, NextResponse } from "next/server";
import { couponSchema } from "../../../../models/coupon";
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
            const { name, quantity, discountInPercent, couponProductId } =
            parsedData;
            
            // check all feilds in requested data
            if (!name && !quantity && !discountInPercent && !couponProductId) {
              return NextResponse.json(
                { message: "please fill all feilds", success: false },
                { status: 400 }
                );
              }
              // set data to save form the database
              const isCouponAvaliable = await couponSchema.find();
              
          if (isCouponAvaliable.length === 0) {
            const data = new couponSchema({
              name,
              quantity,
              discountInPercent,
              couponProductId,
              addUserBy: tokenValue.data._id,
              role: tokenValue.data.role,
            });
            try {
              const response = await data.save();
              return NextResponse.json(
                { message: "coupon add successfully", success: true, response },
                { status: 200 }
              );
            } catch (err) {
              console.log(err);
              return NextResponse.json(
                { message: "coupon not saved", success: false },
                { status: 404 }
              );
            }
          } else {
            const updateCoupon = await couponSchema.updateOne(
              { _id: isCouponAvaliable[0]._id },
              {
              name,
              quantity,
              discountInPercent,
            });
            return NextResponse.json(
              { message: "coupon update successfully", success: true },
              { status: 200 }
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
  const pid = req.nextUrl.searchParams.get("pid");
  try {
    await mongoose.connect(URI);
    try {
      if (pid) {
        const response = await couponSchema.find({ couponProductId: pid });
        if (response.length === 0) {
          return NextResponse.json(
            {
              message: "no coupon on this product",
              data: response,
              success: false,
            },
            { status: 200 }
          );
        }
        return NextResponse.json(
          {
            message: "coupon found successfully",
            data: response,
            success: true,
          },
          { status: 200 }
        );
      } else {
        const response = await couponSchema.find();
        return NextResponse.json(
          {
            message: "coupon found successfully",
            data: response,
            success: true,
          },
          { status: 200 }
        );
      }
    } catch (err) {
      console.log(err);
      return NextResponse.json(
        { message: "coupon not found", success: false },
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
      const tokenValue = await jwt.verify(token, key);
      if (
        tokenValue.data.role === "admin" ||
        tokenValue.data.role === "co-admin"
      ) {
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
            const response = await couponSchema.deleteOne({
              _id: id,
            });
            if (response.deletedCount === 0) {
              return NextResponse.json(
                { message: "Coupon not deleted", success: false },
                { status: 200 }
              );
            }
            return NextResponse.json(
              {
                message: "Coupon delete successfully",
                success: true,
                response,
              },
              { status: 200 }
            );
          } catch (err) {
            console.log(err);
            return NextResponse.json(
              { message: "Coupon not deleted", success: false },
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
      } else {
        return NextResponse.json(
          { message: "permission denied", success: false },
          { status: 200 }
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
