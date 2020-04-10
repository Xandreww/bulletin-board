const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  authenticated: { type: Boolean, required: true },
  admin: { type: Boolean, required: true },
});

module.exports = mongoose.model('User', userSchema);
