import mongoose from "mongoose";

const user = new mongoose.Schema({
  number: String,
});

export const User =
  mongoose.models.user || mongoose.model("user", user);
