require('dotenv').config();

// Fix for querySrv ECONNREFUSED on Windows (DNS SRV lookup fails with default resolver)
try {
  const dns = require('node:dns');
  if (dns.setServers) dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch (_) {}

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const apiKeyAuth = require('./middleware/apiKey');
const usersRouter = require('./routes/users');
const tasksRouter = require('./routes/tasks');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/project-management';

app.use(cors({ origin: ['http://localhost:3000', 'http://127.0.0.1:3000'] }));
app.use(express.json());

app.use('/api/users', apiKeyAuth, usersRouter);
app.use('/api/tasks', apiKeyAuth, tasksRouter);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Project Management API' });
});

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  })
  .catch((err) => console.error('MongoDB connection error:', err));
