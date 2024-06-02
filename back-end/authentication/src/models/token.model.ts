import { config } from "dotenv";
import mongoose, { Document, Schema } from "mongoose";
config();
//change refreshtoken to string type
interface IRefreshToken extends Document {
  id: Number;
  refreshTokens: string[];
  createdAt: Date;
}

const refreshTokenSchema: Schema = new Schema({
  id: { type: String, required: true },
  refreshTokens: { type: String, required: true },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: process.env.REFRESHTOKENEXPIRY,
  },
});

// const RefreshToken = mongoose.model("RefreshToken", refreshTokenSchema);
const RefreshTokenModel = mongoose.model<IRefreshToken>(
  "RefreshToken",
  refreshTokenSchema
);

export default RefreshTokenModel;
