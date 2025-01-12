const express = require('express');
const Contribution = require('../models/Contribution');

const router = express.Router();

// Create a contribution
router.post('/', async (req, res) => {
  try {
    const contribution = new Contribution(req.body);
    await contribution.save();
    res.status(201).json(contribution);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all contributions for a specific project
router.get('/project/:projectId', async (req, res) => {
  try {
    const contributions = await Contribution.find({ project: req.params.projectId }).populate('contributor');
    res.status(200).json(contributions);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
