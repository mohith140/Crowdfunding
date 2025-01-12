const express = require('express');
const Campaigner = require('../models/Campaigner');
const Project = require('../models/Campaigner');

const router = express.Router();

// Create a new campaigner
router.post('/', async (req, res) => {
    try {
        const campaigner = new Campaigner(req.body);
        await campaigner.save();
        res.status(201).json(campaigner);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get all campaigners
router.get('/', async (req, res) => {
    try {
        const campaigners = await Campaigner.find().populate('projects');
        res.status(200).json(campaigners);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
