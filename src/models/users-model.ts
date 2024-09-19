import e from "express";
import mongoose, { Schema } from "mongoose";
const users = new Schema({
    username: { type: String, require: true, unique: true },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    admin: { type: Number, default: 0 },
    status: { type: Number, default: 1 }
});
export default mongoose.model("users", users);