const mongoose = require('mongoose');

const campaignerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  contact: { type: String, required: true },
  projects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Project' }] // References projects
});

module.exports = mongoose.model('Campaigner', campaignerSchema);
