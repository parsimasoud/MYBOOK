// import mongoose from "mongoose";

// const ReadingProgressSchema = new mongoose.Schema(
//   {
//     userId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },

//     bookId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Book",
//       required: true,
//     },

//     chapterId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Chapter",
//       required: true,
//     },

//     pageNumber: {
//       type: Number,
//       required: true,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// // هر کاربر برای هر کتاب فقط یک Progress داشته باشد
// ReadingProgressSchema.index(
//   {
//     userId: 1,
//     bookId: 1,
//   },
//   {
//     unique: true,
//   }
// );

// export default mongoose.models.ReadingProgress ||
//   mongoose.model("ReadingProgress", ReadingProgressSchema);
import mongoose from "mongoose";

const ReadingProgressSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

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

    status: {
      type: String,
      enum: [
        "reading",
        "finished",
        "archived",
      ],
      default: "reading",
    },
  },
  {
    timestamps: true,
  }
);

ReadingProgressSchema.index(
  {
    userId: 1,
    bookId: 1,
  },
  {
    unique: true,
  }
);

export default mongoose.models.ReadingProgress ||
  mongoose.model("ReadingProgress", ReadingProgressSchema);