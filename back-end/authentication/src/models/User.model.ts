import { Document, Schema, model } from 'mongoose';
import { string } from 'zod';
import { config } from "dotenv";
config();
interface IUser extends Document {
  _id: Number;
  refreshToken: string;
  createdAt: Date;
}

// Define the schema for user document
const UserSchema = new Schema<IUser>({
  _id: { type: Number, required: true },
  refreshToken: { type: String, required: true },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: process.env.REFRESHTOKENEXPIRY,
  },
});

// Create and export the User model
const UserModel = model<IUser>('User', UserSchema);

export default UserModel;
