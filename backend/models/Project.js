const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  goalAmount: { type: Number, required: true },
  currentAmount: { type: Number, default: 0 },
  campaigner: { type: mongoose.Schema.Types.ObjectId, ref: 'Campaigner', required: true }, // Reference to Campaigner
  contributions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Contribution' }], // References contributions
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Project', projectSchema);
