import { NextRequest, NextResponse } from "next/server";
import { reviewSchema } from "../../../../models/review";
import mongoose from "mongoose";

const URI: any = process.env.MONGOOSE_URI;

export async function POST(req: NextRequest) {
  try {
    await mongoose.connect(URI);
    try {
      const parsedData = await req.json();
      const { reviews, reviewProductId, id } = parsedData;
      // check all feilds in requested data
      if (!reviews && !reviewProductId) {
        return NextResponse.json(
          { message: "please fill all feilds", success: false },
          { status: 400 }
        );
      }

      if (id !== null) {
        const updatedReview = {
          customerName: reviews[0].customerName,
          customerEmail: reviews[0].customerEmail,
          heading: reviews[0].heading,
          desc: reviews[0].desc,
          rating: reviews[0].rating,
          reviewImage: reviews[0].image,
          _id: id,
        };
        const response = await reviewSchema.updateOne(
          {
            reviewProductId,
            reviews: {
              $elemMatch: {
                _id: id,
              },
            },
          },
          {
            $set: {
              "reviews.$": updatedReview,
            },
          }
        );
        if (response.modifiedCount === 1) {
          return NextResponse.json(
            { message: "review update successfully", success: true },
            { status: 200 }
          );
        } else {
          return NextResponse.json(
            { message: "review not update ", success: false },
            { status: 400 }
          );
        }
      }

      const updateRes = await reviewSchema.findOneAndUpdate(
        { reviewProductId: reviewProductId },
        {
          $push: { reviews: reviews },
        }
      );
      if (updateRes !== null) {
        return NextResponse.json(
          { message: "review add successfully", success: true },
          { status: 200 }
        );
      } else {
        const data = new reviewSchema({
          reviews,
          reviewProductId,
        });
        try {
          const response = await data.save();
          return NextResponse.json(
            { message: "review add successfully", success: true, response },
            { status: 200 }
          );
        } catch (err) {
          console.log(err);
          return NextResponse.json(
            { message: "review not saved", success: false },
            { status: 404 }
          );
        }
      }
    } catch (err) {
      console.log(err);
      return NextResponse.json(
        { message: "unauthorized userr", success: false },
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
      const response = await reviewSchema.find({
        reviewProductId: pid,
      });

      return NextResponse.json(
        { message: "review found successfully", data: response, success: true },
        { status: 200 }
      );
    } catch (err) {
      console.log(err);
      return NextResponse.json(
        { message: "review not found", success: false },
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
        const response = await reviewSchema.updateOne(
          { _id: documentId },
          {
            $pull: { reviews: { _id: id } },
          }
        );
        if (response.modifiedCount === 0) {
          return NextResponse.json(
            { message: "review not deleted ", success: false },
            { status: 200 }
          );
        }
        return NextResponse.json(
          { message: "review delete successfully", success: true, response },
          { status: 200 }
        );
      } catch (err) {
        console.log(err);
        return NextResponse.json(
          { message: "review not delete", success: false },
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
