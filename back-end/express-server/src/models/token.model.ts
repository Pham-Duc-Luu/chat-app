import { Document, Types, Schema, model } from 'mongoose';

interface IToken extends Document {
  _id: string | Types.ObjectId;
  email: string;
  userId: string;
  refreshToken?: string[];
}

const TokenSchema = new Schema<IToken>({
  email: { type: String, required: true, unique: true },
  userId: { type: String, required: true, unique: true },
  refreshToken: { type: String, required: true, default: [] },
});

const tokenSchema = model<IToken>('Token', TokenSchema);
export default tokenSchema;
