import mongoose from "mongoose";

const querySchema = new mongoose.Schema({
  name: String,
  email: String,
  issue: String,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Query", querySchema);