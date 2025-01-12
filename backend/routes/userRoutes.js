const express = require('express');
const User = require('../models/Campaigner');

const router = express.Router();

// Create a user
router.post('/', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find().populate('contributions');
    res.status(200).json(users);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
