// Error handling middleware
function errorHandler(err, req, res, next) {
    console.error(err.stack); // Log the stack trace for debugging
    
    // Default error response
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
  
    res.status(statusCode).json({
      error: {
        message,
        // Optionally include stack trace in development mode only
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
      }
    });
  }
  
  module.exports = errorHandler;
  