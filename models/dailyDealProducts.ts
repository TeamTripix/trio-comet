import mongoose from "mongoose";

const product = new mongoose.Schema(
  {
    name: { type: String, require: true },
    description: { type: String, require: true },
    price: { type: Number, require: true },
    discountPrice: { type: Number, require: true },
    quantity: { type: String, require: true },
    isSale: { type: Boolean, require: true },
    category: { type: String, require: true },
    offerTag: { type: String },
    specification: { type: Array },
    productColor: { type: Array, require: true },
    descImage: { type: Object, require: true },
    specificationItems: { type: Object, require: true },
    createdAt: { type: Date, default: Date.now, index: { expires: 86400 } },
  },
  { timestamps: true }
);

export const dailyDealsProductSchema =
  mongoose.models.dailyDeals || mongoose.model("dailyDeals", product);
