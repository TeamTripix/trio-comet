import mongoose from "mongoose";

const FAQ = new mongoose.Schema({
  FAQs: [{ heading: String, desc: String }],
  FAQProductId: { type: String, require: true },
  addUserBy: { type: String, require: true },
  isAdmin: { type: String },
});

export const FAQSchema = mongoose.models.FAQ || mongoose.model("FAQ", FAQ);
