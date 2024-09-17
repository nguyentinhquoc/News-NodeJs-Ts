import e from "express";
import mongoose, { Schema } from "mongoose";
const comments = new Schema({
    comment: { type: String, required: true },
    users: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
    news: { type: mongoose.Schema.Types.ObjectId, ref: 'news', required: true },
    date: { type: Date, default: Date.now }
});
export default mongoose.model("comments", comments);