import mongoose, { Document, Schema } from "mongoose";

export interface ITask extends Document {
  title: string;
  description: string;
  status: string;
  createdBy: string;
  id: string;
}

const TaskSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, required: true, default: "pending" },
  createdBy: { type: String, required: true },
  id: { type: String },
});

export default mongoose.model<ITask>("Task", TaskSchema);
