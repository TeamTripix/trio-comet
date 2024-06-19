import { NextResponse } from "next/server";
import { User } from "../../../../models/user";
import { otpSchema } from "../../../../models/otp";
import mongoose from "mongoose";
import axios from "axios";
// let jwt = require("jsonwebtoken");
// const URI: any = process.env.MONGOOSE_URI;
export async function POST(req: Request) {
    try {
        const parsedData = await req.json();
        const { merchantID, data } = parsedData
        const token =
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjQ4MTAyMjUsInNvdXJjZSI6InNyLWF1dGgtaW50IiwiZXhwIjoxNzE5NDEzMDQ2LCJqdGkiOiJJN2RtNHBRSU5KTVBjOGdVIiwiaWF0IjoxNzE4NTQ5MDQ2LCJpc3MiOiJodHRwczovL3NyLWF1dGguc2hpcHJvY2tldC5pbi9hdXRob3JpemUvdXNlciIsIm5iZiI6MTcxODU0OTA0NiwiY2lkIjo0NTc5NTA4LCJ0YyI6MzYwLCJ2ZXJib3NlIjpmYWxzZSwidmVuZG9yX2lkIjowLCJ2ZW5kb3JfY29kZSI6IiJ9.lkygB8ybk5BO6ghMsjR8BCcT53YDhcwpRX3p2GuUIpc";
        if (merchantID) {
            axios.post(
                "https://apiv2.shiprocket.in/v1/external/orders/create/adhoc",
                {
                    headers: {
                        Authorization: "Bearer " + token,
                    },
                },
                data
            )
                .then((res) => {
                    return NextResponse.json(
                        { message: "Your Product Order Successfully", success: true },
                        { status: 201 }
                    );
                })
                .catch((error) => {
                    console.error(error);
                    return NextResponse.json(
                        { message: "Order Fail", success: false },
                        { status: 400 }
                    );
                }
                );
        }
    } catch (err) {
        console.log(err);
        return NextResponse.json(
            { message: " Internal server error", success: false },
            { status: 500 }
        );
    }
}
