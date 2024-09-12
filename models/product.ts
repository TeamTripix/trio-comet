import mongoose from "mongoose";

const product = new mongoose.Schema({
  name: { type: String, require: true },
  description: { type: String, require: true },
  price: { type: Number, require: true },
  discountPrice: { type: Number, require: true },
  quantity: { type: String, require: true },
  isSale: { type: Boolean, require: true },
  category: { type: Array, require: true },
  offerTag: { type: Array },
  specification: { type: Array },
  productColor: { type: Array, require: true },
  descImage: { type: Object, require: true },
  specificationItems: { type: Object, require: true },
  SKU: { type: String, require: true },
});

export const productSchema =
  mongoose.models.product || mongoose.model("product", product);
