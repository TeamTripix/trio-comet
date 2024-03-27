import mongoose from "mongoose";

const aboutUs = new mongoose.Schema({
  banner: { type: String, required: true },
  desc: { type: String, required: true },
  addUserBy: { type: String, required: true },
  isAdmin: { type: String },
});

export const aboutUsSchema =
  mongoose.models.aboutUs || mongoose.model("aboutUs", aboutUs);
