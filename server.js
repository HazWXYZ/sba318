const express = require('express');
const path = require('path');
const { authors, categories, quotes } = require('./data');
const { 
  requestLogger, 
  responseTimeTracker, 
  errorHandler, 
  notFoundHandler 
} = require('./middleware');

// Import route files
const authorsRouter = require('./routes/authors');
const categoriesRouter = require('./routes/categories');
const quotesRouter = require('./routes/quotes');

const app = express();
const PORT = process.env.PORT || 3000;

// View engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Custom middleware
app.use(requestLogger);
app.use(responseTimeTracker);

// API Routes
app.use('/api/authors', authorsRouter);
app.use('/api/categories', categoriesRouter);
app.use('/api/quotes', quotesRouter);

// View Routes
// Home page
app.get('/', (req, res) => {
  res.render('index', { authors, categories, quotes });
});

// Browse quotes page with filtering
app.get('/quotes', (req, res) => {
  let filteredQuotes = [...quotes];
  const { authorId, categoryId } = req.query;
  
  // Filter by author if parameter exists
  if (authorId) {
    filteredQuotes = filteredQuotes.filter(q => q.authorId === parseInt(authorId));
  }
  
  // Filter by category if parameter exists
  if (categoryId) {
    filteredQuotes = filteredQuotes.filter(q => q.categoryId === parseInt(categoryId));
  }
  
  res.render('quotes', { 
    quotes: filteredQuotes, 
    authors, 
    categories,
    selectedAuthor: authorId || null,
    selectedCategory: categoryId || null
  });
});

// Add quote form (GET)
app.get('/add-quote', (req, res) => {
  res.render('add-quote', { authors, categories, message: null });
});

// Add quote form submission (POST)
app.post('/add-quote', (req, res) => {
  const { text, authorId, categoryId, year, likes } = req.body;
  
  // Validate required fields
  if (!text || !authorId || !categoryId) {
    return res.render('add-quote', { 
      authors, 
      categories, 
      message: 'Please fill in all required fields.',
      messageType: 'error'
    });
  }
  
  // Validate that author and category exist
  const authorExists = authors.find(a => a.id === parseInt(authorId));
  const categoryExists = categories.find(c => c.id === parseInt(categoryId));
  
  if (!authorExists || !categoryExists) {
    return res.render('add-quote', { 
      authors, 
      categories, 
      message: 'Invalid author or category selected.',
      messageType: 'error'
    });
  }
  
  // Create new quote
  const newQuote = {
    id: quotes.length > 0 ? Math.max(...quotes.map(q => q.id)) + 1 : 1,
    text,
    authorId: parseInt(authorId),
    categoryId: parseInt(categoryId),
    year: year ? parseInt(year) : null,
    likes: likes ? parseInt(likes) : 0
  };
  
  quotes.push(newQuote);
  
  // Show success message
  res.render('add-quote', { 
    authors, 
    categories, 
    message: 'Quote added successfully! ✨',
    messageType: 'success'
  });
});

// 404 handler
app.use(notFoundHandler);

// Error handling middleware (must be last)
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`✨ Quote Collection server is running on http://localhost:${PORT}`);
  console.log(`📖 Browse Quotes: http://localhost:${PORT}/quotes`);
  console.log(`➕ Add Quote: http://localhost:${PORT}/add-quote`);
  console.log(`🔌 API endpoints available at /api/quotes, /api/authors, /api/categories`);
});
