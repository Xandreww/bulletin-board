const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: Number },
  content: { type: String, required: true },
  email: { type: String, required: true },
  telephone: { type: String },
  photo: { type: String },
  date: { type: Date, required: true },
  updateDate: { type: Date, required: true },
  status: { type: String, required: true },
  userId: { type: String, required: true },
});

module.exports = mongoose.model('Post', postSchema);
