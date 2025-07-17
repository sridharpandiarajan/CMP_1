const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('✅ Connected to MongoDB');
  app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
})
.catch((err) => console.error('❌ MongoDB connection error:', err));

// Routes
const workerRoutes = require('./routes/Workers');
app.use('/api/workers', workerRoutes);

// Root endpoint
app.get('/', (req, res) => res.send('🌐 CMP Worker API running'));

// Catch-all 404
app.use((req, res) => res.status(404).json({ error: 'Route not found' }));
