import mongoose from "mongoose";
import 'dotenv/config'

export default async function connectDB() {
  try {
    await mongoose.connect("mongodb://localhost:27017/news");
    console.log(
      "<+====================Connect DB SUCCESS====================+>"
    );
  } catch (error) {
    console.log("<+====================Connect DB ERROR====================+>");
  }
};