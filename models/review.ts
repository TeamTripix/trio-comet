import mongoose from "mongoose";

const review = new mongoose.Schema({
  reviews: [
    {
      customerName: String,
      customerEmail: String,
      heading: String,
      desc: String,
      rating: Number,
      date: { type: Date, default: Date.now },
      image: String,
    },
  ],
  reviewProductId: { type: String, require: true },
});

export const reviewSchema =
  mongoose.models.review || mongoose.model("review", review);
