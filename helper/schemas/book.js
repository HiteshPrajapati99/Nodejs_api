const mongoose = require("mongoose");

const booklist = mongoose.Schema({
  name: { type: String, required: true, minilength: 3 },
  desc: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  book: { type: String, required: true },
  bookpath: { type: String, required: true },
});

module.exports = mongoose.model("book", booklist);
