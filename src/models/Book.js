import mongoose from "mongoose";

const BookSchema = new mongoose.Schema({
  title: String,
  author: String,
  coverImage: String,
  backgroundImage: String,
  levelId: String,
  chaptersCount: Number,
  description: String,
  slug: String,
  isPublished: Boolean,
});

export default mongoose.models.Book ||
mongoose.model("Book", BookSchema);