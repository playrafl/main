import mongoose, { Document, Schema } from "mongoose";
export interface IUser extends Document {
  userName: string;
  fullName: string;
  email: number;
  password: string;
}

const userSchema: Schema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.models.User || mongoose.model<IUser>("User", userSchema);

export default User;
