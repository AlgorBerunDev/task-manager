import mongoose, { Document, Schema } from "mongoose";

export interface ITask extends Document {
  title: string;
  description: string;
  status: string;
  createdBy: string;
  completedAt: Date;
  createdAt: Date;
  updatedAt: Date;
  next: string | null;
}

const TaskSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, required: true, default: "pending" },
    createdBy: { type: String, required: true },
    completedAt: { type: Date, default: null },
    next: { type: String, default: null },
  },
  { timestamps: true }
);

export default mongoose.model<ITask>("Task", TaskSchema);
