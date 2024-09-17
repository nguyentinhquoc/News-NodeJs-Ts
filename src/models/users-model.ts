import e from "express";
import mongoose, { Schema } from "mongoose";
const users = new Schema({
});
export default mongoose.model("users", users);