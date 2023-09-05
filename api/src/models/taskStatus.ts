import mongoose, { Document, Schema } from "mongoose";

export interface ITaskStatus extends Document {
  name: string;
  title: string;
  description: string;
  color: string;
  next: string | null;
  prev: string | null;
}

const TaskStatusSchema: Schema = new Schema({
  name: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String },
  color: { type: String },
  next: { type: String, default: null },
  prev: { type: String, default: null },
});

export default mongoose.model<ITaskStatus>("TaskStatus", TaskStatusSchema);
