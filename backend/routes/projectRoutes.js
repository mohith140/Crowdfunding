const express = require('express');
const Project = require('../models/Campaigner');

const router = express.Router();

// Create a project
router.post('/', async (req, res) => {
  try {
    const project = new Project(req.body);
    await project.save();
    res.status(201).json(project);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all projects
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find().populate('campaigner contributions');
    res.status(200).json(projects);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
