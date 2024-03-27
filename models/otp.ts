const mongoose = require("mongoose");

const otp = new mongoose.Schema(
  {
    number: { type: String, required: true },
    OTP: { type: String, required: true },
    createdAt: { type: Date, default: Date.now, index: { expires: 300 } },
  },
  { timestamps: true }
);

export const otpSchema = mongoose.models.otp || mongoose.model("otp", otp);
