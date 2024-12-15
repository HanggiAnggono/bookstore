const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const orderHandler = require('./api/order-handler');
const { syncDatabase } = require('./config/database');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('combined'));
app.use(helmet());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'healthy' });
});

// API routes
app.use('/api', orderHandler);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Something went wrong!',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

const port = process.env.PORT || 5000;

// Sync database before starting the server
syncDatabase().then(() => {
  app.listen(port, () => {
    console.log(`Order service listening on port ${port}`);
  });
}); 