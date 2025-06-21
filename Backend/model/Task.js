import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  assignedTo: { type: String, required: true },
  status: { type: String, enum: ["pending", "in progress", "completed"], default: "pending" },
}, { timestamps: true });

export default mongoose.model("Task", taskSchema);
