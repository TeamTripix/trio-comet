import mongoose from "mongoose";

const bulkQuery = new mongoose.Schema({
  name: { type: String, require: true },
  mobile: { type: Number, require: true },
  email: { type: String, require: true },
  state: { type: String, require: true },
  queryMessage: { type: String, require: true },
});

export const bulkQuerySchema =
  mongoose.models.bulkQuery || mongoose.model("bulkQuery", bulkQuery);
