const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  content: { type: String, required: true },
  email: { type: String, required: true },
  telephone: { type: String },
  photo: { type: String },
  date: { type: Date, required: true },
  updateDate: { type: Date, required: true },
  status: { type: String, required: true },
  userId: [{ type: mongoose.SchemaTypes.ObjectId, required: true, ref: 'User' }],
});

module.exports = mongoose.model('Post', postSchema);
