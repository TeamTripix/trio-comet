import { NextRequest, NextResponse } from "next/server";
import { FAQSchema } from "../../../../models/FAQ";
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
          const { FAQs, FAQProductId, id } = parsedData;
          if (id !== "") {
            const updatedFAQ = {
              heading: FAQs[0].heading,
              desc: FAQs[0].desc,
              _id: id,
            };
            const response = await FAQSchema.updateOne(
              {
                FAQProductId,
                FAQs: {
                  $elemMatch: {
                    _id: id,
                  },
                },
              },
              {
                $set: {
                  "FAQs.$": updatedFAQ,
                },
              }
            );
            if (response.modifiedCount === 1) {
              return NextResponse.json(
                { message: "FAQ update successfully", success: true },
                { status: 200 }
              );
            } else {
              return NextResponse.json(
                { message: "FAQ not update ", success: false },
                { status: 400 }
              );
            }
          }

          // check all feilds in requested data
          if (!FAQs && !FAQProductId) {
            return NextResponse.json(
              { message: "please fill all feilds", success: false },
              { status: 400 }
            );
          }
          const updateRes = await FAQSchema.findOneAndUpdate(
            { FAQProductId: FAQProductId },
            {
              $push: { FAQs: FAQs },
            }
          );

          if (updateRes !== null) {
            return NextResponse.json(
              { message: "FAQ add successfully", success: true },
              { status: 200 }
            );
          } else {
            const data = new FAQSchema({
              FAQs,
              FAQProductId,
              addUserBy: tokenValue.data.id,
              isAdmin: tokenValue.data.isAdmin,
            });
            try {
              const response = await data.save();
              return NextResponse.json(
                { message: "FAQ add successfully", success: true, response },
                { status: 200 }
              );
            } catch (err) {
              console.log(err);
              return NextResponse.json(
                { message: "FAQ not saved", success: false },
                { status: 404 }
              );
            }
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
  const pid = req.nextUrl.searchParams.get("id");
  try {
    await mongoose.connect(URI);
    try {
      const response = await FAQSchema.find({
        FAQProductId: pid,
      });

      return NextResponse.json(
        { message: "FAQ found successfully", data: response, success: true },
        { status: 200 }
      );
    } catch (err) {
      console.log(err);
      return NextResponse.json(
        { message: "FAQ not found", success: false },
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
      const { id, documentId } = parsedData;

      // check all feilds in requested data
      if (!id || !documentId) {
        return NextResponse.json(
          { message: "please fill all feilds", success: false },
          { status: 400 }
        );
      }
      try {
        const response = await FAQSchema.updateOne(
          { _id: documentId },
          {
            $pull: { FAQs: { _id: id } },
          }
        );
        if (response.modifiedCount === 0) {
          return NextResponse.json(
            { message: "FAQ not deleted ", success: false },
            { status: 200 }
          );
        }
        return NextResponse.json(
          { message: "FAQ delete successfully", success: true, response },
          { status: 200 }
        );
      } catch (err) {
        console.log(err);
        return NextResponse.json(
          { message: "FAQ not delete", success: false },
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

export async function PUT(req: NextRequest) {
  try {
    await mongoose.connect(URI);
    try {
      const parsedData = await req.json();
      const { FAQs, FAQProductId } = parsedData;

      // check all feilds in requested data
      if (!FAQs || !FAQProductId) {
        return NextResponse.json(
          { message: "please fill all feilds", success: false },
          { status: 400 }
        );
      }
      try {
        const response = await FAQSchema.updateOne(
          {
            _id: FAQProductId,
            FAQs: {
              $elemMatch: {
                _id: FAQs.id,
              },
            },
          },
          {
            $set: { FAQs: { heading: FAQs.heading }, desc: FAQs.desc },
          }
        );

        if (response.modifiedCount === 0) {
          return NextResponse.json(
            { message: "FAQ not deleted ", success: false },
            { status: 200 }
          );
        }
        return NextResponse.json(
          { message: "FAQ delete successfully", success: true, response },
          { status: 200 }
        );
      } catch (err) {
        console.log(err);
        return NextResponse.json(
          { message: "FAQ not delete", success: false },
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
