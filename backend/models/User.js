const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  contributions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Contribution' }] // References contributions
});

module.exports = mongoose.model('User', userSchema);
