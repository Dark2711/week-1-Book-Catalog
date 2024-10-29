const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    coverUrl: {
      type: String,
    },
    bookUrl: {
      type: String,
    },
    description: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
    },
  },
  { timestamps: true },
);

export const Book = mongoose.model('Book', bookSchema);
