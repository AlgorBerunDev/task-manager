import mongoose, { Document, Schema } from "mongoose";

export interface ITaskStatus extends Document {
  name: string;
  title: string;
  description: string;
  next: string;
}

const TaskStatusSchema: Schema = new Schema({
  name: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String },
  next: { type: String, default: null },
});

export default mongoose.model<ITaskStatus>("TaskStatus", TaskStatusSchema);
