import mongoose from "mongoose";

const sellerUser = new mongoose.Schema({
  username: String,
  password: String,
  number: Number,
  role: String,
  isActive: Boolean,
});

export const SellerUser =
  mongoose.models.sellerUser || mongoose.model("sellerUser", sellerUser);
