import mongoose from "mongoose";
import "dotenv/config";

const connectDB = async () => {
  const MONGO_URI = process.env.MONGO_URI;
  try {
    await mongoose.connect(MONGO_URI, { useNewUrlParser: true });
    console.log("MongoDB Connected...");
  } catch (error) {
    console.log(error.message);
  }
};

export default connectDB;
