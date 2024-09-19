import e from "express";
const slugUpdater = require('mongoose-slug-updater');
import mongoose, { Schema } from "mongoose";
mongoose.plugin(slugUpdater);
const news = new Schema({
  title: { type: String },
  content: { type: String },
  image: { type: String },
  comments: { type: String },
  slug: { type: String, slug: "title", unique: true },
  dateCreate: { type: Date, default: Date.now },
  dateEdit: { type: Date, default: Date.now }
});
export default mongoose.model("news", news);