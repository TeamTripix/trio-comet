import mongoose from "mongoose";

const blog = new mongoose.Schema(
  {
    heading: { type: String, required: true },
    banner: { type: String, required: true },
    desc: { type: String, required: true },
    addUserBy: { type: String, required: true },
    isAdmin: { type: String },
  },
  { timestamps: true }
);

export const blogSchema = mongoose.models.blog || mongoose.model("blog", blog);
