import mongoose from "mongoose";

const user = new mongoose.Schema({
  number: String,
  name: String,
  profileImage:String,
  email:String,
  address:String,
});

export const User =
  mongoose.models.user || mongoose.model("user", user);
