import mongoose from "mongoose";

const coupon = new mongoose.Schema({
  name: { type: String, require: true },
  quantity: { type: Number, require: true },
  discountInPercent: { type: Number, require: true },
  couponProductId: { type: String, require: true },
  addUserBy: { type: String, require: true },
  isAdmin: { type: String },
});

export const couponSchema =
  mongoose.models.coupon || mongoose.model("coupon", coupon);
