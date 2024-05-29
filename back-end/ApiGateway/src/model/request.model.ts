import { countReset } from "console";
import { config } from "dotenv";
import mongoose, { Document, Schema } from "mongoose";
config();
interface IRequest extends Document {
  ip: string;
  countRequest: number;
}

const limitRequest: Schema = new Schema({
  ip: { type: String, required: true },
  countRequest: {type: Number, require :true}
});

const RestrictRequestModel = mongoose.model<IRequest>("LimitRequest", limitRequest);

export default RestrictRequestModel;
