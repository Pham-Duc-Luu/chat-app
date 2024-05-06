import { Document, Schema, Types, model } from 'mongoose';

interface IUser extends Document {
  _id: string | Types.ObjectId;
  username: string;
  password: string;
  email: string;
}

// Define the schema for user document
const UserSchema = new Schema<IUser>({
  _id: { type: Schema.Types.ObjectId, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
});

// Create and export the User model
const UserModel = model<IUser>('User', UserSchema);

export default UserModel;
