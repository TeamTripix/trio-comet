import mongoose from "mongoose";

const banner = new mongoose.Schema({
  id: { type: String, required: true },
  mobileImageURL: { type: String, required: true },
  imageURL: { type: String, required: true },
  link: { type: String, required: true },
  addUserBy: { type: String, required: true },
  isAdmin: { type: String },
});

export const bannerSchema =
  mongoose.models.banner || mongoose.model("banner", banner);
