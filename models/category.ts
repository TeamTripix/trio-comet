import mongoose from "mongoose";

const category = new mongoose.Schema({
  id: { type: Number, require: true },
  name: { type: String, required: true },
  image: { type: String, require: true },
  addUserBy: { type: String, required: true },
  isAdmin: { type: Boolean },
});

export const categorySchema =
  mongoose.models.category || mongoose.model("category", category);
