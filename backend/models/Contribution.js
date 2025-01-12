const mongoose = require('mongoose');

const contributionSchema = new mongoose.Schema({
  project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true }, // Reference to Project
  contributor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to User
  amount: { type: Number, required: true },
  contributedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Contribution', contributionSchema);
