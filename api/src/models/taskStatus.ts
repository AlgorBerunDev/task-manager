import mongoose, { Document, Schema } from "mongoose";

export interface ITaskStatus extends Document {
  name: string;
  description: string;
}

const TaskStatusSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
});

export default mongoose.model<ITaskStatus>("TaskStatus", TaskStatusSchema);
