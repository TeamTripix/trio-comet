import axios from "axios";
import crypto from "crypto";
import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { NextRequest } from "next/server";

const SALT_KEY = "76195ee1-015d-49d9-a1ff-fb18030e48bc";
const MERCHANT_ID = "M22WJPEOU0NE0";
// const MERCHANT_ID = "PGTESTPAYUAT"
// const SALT_KEY = "099eb0cd-02cf-4e2a-8aca-3e6c6aff0399";

export async function POST(req: NextRequest) {
  const parsedData = await req.json();
  if (req.method !== "POST") {
    return NextResponse.json(
      { message: "Method not allowed", success: false },
      { status: 405 }
    );
  }

  const { transactionId, MUID, name, amount, number } = parsedData;

  try {
    const merchantTransactionId = transactionId;
    const salt_key = SALT_KEY;
    const merchant_id = MERCHANT_ID;

    const data = {
      merchantId: merchant_id,
      merchantTransactionId: merchantTransactionId,
      merchantUserId: MUID,
      name,
      amount: amount * 100,
      redirectUrl: `http://localhost:3000/status/?id=${merchantTransactionId}`,
      redirectMode: "POST",
      mobileNumber: number,
      paymentInstrument: {
        type: "PAY_PAGE",
      },
    };

    
    const payload = JSON.stringify(data);
    const payloadMain = Buffer.from(payload).toString("base64");
    const keyIndex = 1;
    const string = payloadMain + "/pg/v1/pay" + salt_key;
    const sha256 = crypto.createHash("sha256").update(string).digest("hex");
    const checksum = sha256 + "###" + keyIndex;
    
    const prod_URL =
    "https://api.phonepe.com/apis/hermes/pg/v1/pay";

    // const prod_URL = "https://api.phonepe.com/apis/hermes"
    
    const options = {
        method: "POST",
        url: prod_URL,
        headers: {
            accept: "application/json",
            "Content-Type": "application/json",
            "X-VERIFY": checksum,
        },
        data: {
            request: payloadMain,
        },
    };
    const response = await axios.request(options);
    return NextResponse.json(
      { message: "Payment api successfully running", success: true, data: response.data },
      { status: 200 }
    );
    // res.status(200).json(response.data);
  } catch (error: any) {
    return NextResponse.json(
        { message: error.message, success: false,error },
        { status: 500 }
      );
  }
}
