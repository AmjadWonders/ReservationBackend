const app = require('./app');
const connectDB = require('./config/db');

// Load environment variables from .env file
require('dotenv').config();

// Connect to the database
connectDB();

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
