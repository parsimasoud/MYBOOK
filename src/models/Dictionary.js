import mongoose from "mongoose";

const DictionarySchema = new mongoose.Schema(
  {
    word: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    baseWord: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    meanings: {
      type: [String],
      default: [],
    },

    examples: {
      type: [String],
      default: [],
    },

    pronunciation: {
      type: String,
      default: "",
    },

    partOfSpeech: {
      type: String,
      default: "",
    },

    level: {
      type: Number,
      default: 1,
    },

    frequency: {
      type: Number,
      default: 0,
    },

    isPublished: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Dictionary ||
  mongoose.model("Dictionary", DictionarySchema);