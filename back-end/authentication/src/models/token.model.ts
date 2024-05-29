import { config } from "dotenv";
import mongoose, { Document, Schema } from "mongoose";
config();
interface IRefreshToken extends Document {
  id: Number;
  refreshToken: string;
  createdAt: Date;
}

const refreshTokenSchema: Schema = new Schema({
  id: { type: String, required: true },
  refreshToken: { type: String, required: true },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: process.env.REFRESHTOKENEXPIRY,
  },
});

// const RefreshToken = mongoose.model("RefreshToken", refreshTokenSchema);
const RefreshToken = mongoose.model<IRefreshToken>(
  "RefreshToken",
  refreshTokenSchema
);

export default RefreshToken;
