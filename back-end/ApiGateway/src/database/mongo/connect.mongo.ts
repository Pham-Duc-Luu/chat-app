import { config } from "dotenv";
import mongoose from "mongoose";
import app_config from "../../config/server.config";

config();
const MONGODB_URI = `mongodb://${app_config.mongodb.host}:${app_config.mongodb.port}`;

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    return "Connected to Mongo";
  } catch (error) {
    return "Error while try to connect to Mongo";
  }
};
