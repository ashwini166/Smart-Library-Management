const mongoose = require("mongoose");

const borrowHistorySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    book: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
      required: true
    },

    action: {
      type: String,
      enum: ["BORROWED", "RETURNED"],
      required: true
    },

    time: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("BorrowHistory", borrowHistorySchema);