import mongoose, { Document, Schema } from "mongoose";

export interface ITask extends Document {
  title: string;
  description: string;
  status: string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

const TaskSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, required: true, default: "pending" },
    createdBy: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<ITask>("Task", TaskSchema);
