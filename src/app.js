const express = require('express');
const movieRoutes = require('./api/routes/movieRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/movies', movieRoutes);

// Error handling middleware
app.use(errorHandler);

module.exports = app;
