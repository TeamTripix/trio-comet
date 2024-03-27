import { NextRequest, NextResponse } from "next/server";
import { aboutUsSchema } from "../../../../models/aboutUs";
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
          const { desc, banner, id } = parsedData;

          // check all feilds in requested data
          if (!desc && !banner) {
            return NextResponse.json(
              { message: "please fill all feilds", success: false },
              { status: 400 }
            );
          }
          if (id !== null) {
            const updateAboutUs = await aboutUsSchema.findByIdAndUpdate(
              { _id: id },
              { banner: banner, desc: desc }
            );
            return NextResponse.json(
              { message: "About Us update successfully", success: true },
              { status: 201 }
            );
          }

          // set data to save form the database
          const data = new aboutUsSchema({
            desc,
            banner,
            addUserBy: tokenValue.data._id,
            isAdmin: tokenValue.data.role,
          });
          try {
            const response = await data.save();
            return NextResponse.json(
              { message: "About Us add successfully", success: true },
              { status: 200 }
            );
          } catch (err) {
            console.log(err);
            return NextResponse.json(
              { message: "About Us not saved", success: false },
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
  // const blogId = req.nextUrl.searchParams.get("bid");
  try {
    await mongoose.connect(URI);
    try {
      const response = await aboutUsSchema.find();
      return NextResponse.json(
        {
          message: "About Us found successfully",
          data: response,
          success: true,
        },
        { status: 200 }
      );
    } catch (err) {
      console.log(err);
      return NextResponse.json(
        { message: "About Us not found", success: false },
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

// export async function DELETE(req: NextRequest) {
//   try {
//     await mongoose.connect(URI);
//     try {
//       const parsedData = await req.json();
//       const { id } = parsedData;

//       // check all feilds in requested data
//       if (!id) {
//         return NextResponse.json(
//           { message: "please fill all feilds", success: false },
//           { status: 400 }
//         );
//       }
//       try {
//         const response = await aboutUsSchema.deleteOne({
//           _id: id,
//         });
//         if (response.deletedCount === 0) {
//           return NextResponse.json(
//             { message: "Blog not deleted ", success: false },
//             { status: 200 }
//           );
//         }
//         return NextResponse.json(
//           { message: "Blog delete successfully", success: true, response },
//           { status: 200 }
//         );
//       } catch (err) {
//         console.log(err);
//         return NextResponse.json(
//           { message: "Blog not delete", success: false },
//           { status: 404 }
//         );
//       }
//       //   }
//     } catch (err) {
//       console.log(err);
//       return NextResponse.json(
//         { message: "server error", success: false },
//         { status: 500 }
//       );
//     }
//   } catch (err) {
//     console.log(err);
//     return NextResponse.json(
//       { message: "Internal server error", success: false },
//       { status: 500 }
//     );
//   }
// }
