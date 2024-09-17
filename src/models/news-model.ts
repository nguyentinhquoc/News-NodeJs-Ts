import e from "express";
var slug = require('mongoose-slug-generator');
import mongoose, { Schema } from "mongoose";
mongoose.plugin(slug);
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