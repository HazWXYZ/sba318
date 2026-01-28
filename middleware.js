// Custom Middleware

// Middleware 1: Request Logger
const requestLogger = (req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.url}`);
  next();
};

// Middleware 2: Response Time Tracker
const responseTimeTracker = (req, res, next) => {
  const start = Date.now();
  
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`Response time: ${duration}ms for ${req.method} ${req.url}`);
  });
  
  next();
};

// Error handling middleware
const errorHandler = (err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(err.status || 500);
  res.render('error', { 
    error: err.message,
    status: err.status || 500
  });
};

// 404 handler middleware
const notFoundHandler = (req, res) => {
  res.status(404).render('error', {
    error: 'Page not found',
    status: 404
  });
};

module.exports = {
  requestLogger,
  responseTimeTracker,
  errorHandler,
  notFoundHandler
};
