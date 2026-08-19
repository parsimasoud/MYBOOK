import mongoose from "mongoose";

const ContentSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["paragraph", "image"],
      required: true,
    },

    text: String,

    src: String,

    caption: String,
  },
  {
    _id: false,
  }
);

const PageSchema = new mongoose.Schema(
  {
    bookId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
      required: true,
    },

    chapterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chapter",
      required: true,
    },

    pageNumber: {
      type: Number,
      required: true,
    },

    content: [ContentSchema],

    isPublished: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Page ||
  mongoose.model("Page", PageSchema);