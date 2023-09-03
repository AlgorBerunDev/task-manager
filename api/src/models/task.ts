import mongoose, { Document, Schema } from "mongoose";
import { customAlphabet } from "nanoid";
const nanoid = customAlphabet("1234567890abcdef", 10);

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

TaskSchema.pre<ITask>("save", async function (next) {
  this.id = nanoid();
  next();
});

export default mongoose.model<ITask>("Task", TaskSchema);
