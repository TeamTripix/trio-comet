import { NextRequest, NextResponse } from "next/server";
import { SellerUser } from "../../../../models/sellerUser";
import mongoose from "mongoose";
import { headers } from "next/headers";
const jwt = require("jsonwebtoken");

const URI: any = process.env.MONGOOSE_URI;
const key = process.env.JWT_KEY;
export async function POST(req: Request) {
  try {
    await mongoose.connect(URI);
    const parsedData = await req.json();

    if (
      !parsedData.username &&
      !parsedData.password &&
      !parsedData.role &&
      !parsedData.isActive &&
      !parsedData.number
    ) {
      return NextResponse.json(
        { message: "please fill all feilds", success: false },
        { status: 400 }
      );
    }

    const data = new SellerUser({
      username: parsedData.username,
      password: parsedData.password,
      number: parsedData.number,
      role: parsedData.role,
      isActive: parsedData.isActive,
    });

    try {
      const response = await data.save();
      return NextResponse.json(
        { message: "user add successfully", success: true },
        { status: 200 }
      );
    } catch (err) {
      console.log(err);
      return NextResponse.json(
        { message: "user not saved", success: false },
        { status: 404 }
      );
    }
  } catch (err) {
    console.log(err);

    return NextResponse.json(
      { message: " Interna server error", success: false },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    await mongoose.connect(URI);
    const headersList = headers();
    const auth = headersList.get("authorization");
    if (auth && auth.startsWith("Bearer")) {
      const token = auth.substring(7);
      try {
        const tokenValue = await jwt.verify(token, key);
        if (tokenValue.data.role === "admin") {
          try {
            const response: any = await SellerUser.find();
            const users = response.filter((data: any) => data.role !== "admin");
            return NextResponse.json(
              {
                message: "user found successfully",
                success: true,
                data: response,
                users,
              },
              { status: 200 }
            );
          } catch (err) {
            console.log(err);
            return NextResponse.json(
              { message: "user not found", success: false },
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

export async function DELETE(req: NextRequest) {
  try {
    await mongoose.connect(URI);
    const headersList = headers();
    const auth = headersList.get("authorization");
    if (auth && auth.startsWith("Bearer")) {
      const token = auth.substring(7);
      try {
        const tokenValue = await jwt.verify(token, key);
        if (tokenValue.data.role === "admin") {
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
              const response = await SellerUser.findByIdAndDelete({ _id: id });
              return NextResponse.json(
                { message: "User deleted ", success: true },
                { status: 200 }
              );
            } catch (err) {
              console.log(err);
              return NextResponse.json(
                { message: "User not delete", success: false },
                { status: 400 }
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
