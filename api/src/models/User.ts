import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcrypt";

export enum Role {
  Admin = "admin",
  Employee = "employee",
}

export type UserRole = keyof typeof Role;

export interface IUser extends Document {
  username: string;
  password: string;
  roles: string[];
  comparePassword(password: string): Promise<boolean>;
}

const UserSchema: Schema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  roles: { type: [String], required: true },
});

UserSchema.pre<IUser>("save", async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.methods.comparePassword = function (password: string) {
  return bcrypt.compare(password, this.password);
};

export const User = mongoose.model<IUser>("User", UserSchema);
