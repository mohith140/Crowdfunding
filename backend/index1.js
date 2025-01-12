const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const campaignerRoutes = require('./routes/campaignerRoutes');
const projectRoutes = require('./routes/projectRoutes');
const contributionRoutes = require('./routes/contributionRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

// Middleware
app.use(express.json());

// Connect to MongoDB
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.BACKEND_SERVER //|| 'mongodb://127.0.0.1:27017/crowdfunding';

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.error('MongoDB Connection Failed:', err));

// Routes
app.use('/api/campaigners', campaignerRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/contributions', contributionRoutes);
app.use('/api/users', userRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
