// db.ts
import { config } from 'dotenv';
import mongoose from 'mongoose';

config();
const MONGODB_URI =
  process.env.MONGODB_URI || 'mongodb://localhost:27017/software-project';

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    return 'Connected to Mongo';
  } catch (error) {
    return 'Error while try to connect to Mongo';
  }
};
