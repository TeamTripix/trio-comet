import mongoose from "mongoose";

const blackBanner = new mongoose.Schema({
  bannerText: { type: String, required: true },
  bannerURL: { type: String, required: true },
  addUserBy: { type: String, required: true },
  isAdmin: { type: String },
});

export const blackBannerSchema =
  mongoose.models.blackBanner || mongoose.model("blackBanner", blackBanner);
