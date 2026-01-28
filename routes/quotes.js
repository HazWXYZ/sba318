const express = require('express');
const router = express.Router();
const { quotes, authors, categories } = require('../data');

// GET all quotes (with optional filtering)
router.get('/', (req, res) => {
  let filteredQuotes = [...quotes];
  
  // Filter by authorId if query parameter exists
  if (req.query.authorId) {
    const authorId = parseInt(req.query.authorId);
    filteredQuotes = filteredQuotes.filter(q => q.authorId === authorId);
  }
  
  // Filter by categoryId if query parameter exists
  if (req.query.categoryId) {
    const categoryId = parseInt(req.query.categoryId);
    filteredQuotes = filteredQuotes.filter(q => q.categoryId === categoryId);
  }
  
  // Filter by minimum likes if query parameter exists
  if (req.query.minLikes) {
    const minLikes = parseInt(req.query.minLikes);
    filteredQuotes = filteredQuotes.filter(q => q.likes >= minLikes);
  }
  
  res.json(filteredQuotes);
});

// GET single quote by ID
router.get('/:id', (req, res) => {
  const quote = quotes.find(q => q.id === parseInt(req.params.id));
  
  if (!quote) {
    return res.status(404).json({ error: 'Quote not found' });
  }
  
  // Include author and category details
  const author = authors.find(a => a.id === quote.authorId);
  const category = categories.find(c => c.id === quote.categoryId);
  
  res.json({
    ...quote,
    author: author ? author.name : 'Unknown',
    category: category ? category.name : 'Uncategorized'
  });
});

// POST create new quote
router.post('/', (req, res) => {
  const { text, authorId, categoryId, year, likes } = req.body;
  
  if (!text || !authorId || !categoryId) {
    return res.status(400).json({ 
      error: 'Text, author ID, and category ID are required' 
    });
  }
  
  // Validate that author and category exist
  const authorExists = authors.find(a => a.id === parseInt(authorId));
  const categoryExists = categories.find(c => c.id === parseInt(categoryId));
  
  if (!authorExists) {
    return res.status(400).json({ error: 'Invalid author ID' });
  }
  
  if (!categoryExists) {
    return res.status(400).json({ error: 'Invalid category ID' });
  }
  
  const newQuote = {
    id: quotes.length > 0 ? Math.max(...quotes.map(q => q.id)) + 1 : 1,
    text,
    authorId: parseInt(authorId),
    categoryId: parseInt(categoryId),
    year: year ? parseInt(year) : null,
    likes: likes ? parseInt(likes) : 0
  };
  
  quotes.push(newQuote);
  res.status(201).json(newQuote);
});

// PATCH update quote
router.patch('/:id', (req, res) => {
  const quote = quotes.find(q => q.id === parseInt(req.params.id));
  
  if (!quote) {
    return res.status(404).json({ error: 'Quote not found' });
  }
  
  const { text, authorId, categoryId, year, likes } = req.body;
  
  if (text) quote.text = text;
  if (authorId) quote.authorId = parseInt(authorId);
  if (categoryId) quote.categoryId = parseInt(categoryId);
  if (year !== undefined) quote.year = year ? parseInt(year) : null;
  if (likes !== undefined) quote.likes = parseInt(likes);
  
  res.json(quote);
});

// DELETE quote
router.delete('/:id', (req, res) => {
  const index = quotes.findIndex(q => q.id === parseInt(req.params.id));
  
  if (index === -1) {
    return res.status(404).json({ error: 'Quote not found' });
  }
  
  const deletedQuote = quotes.splice(index, 1)[0];
  res.json({ message: 'Quote deleted', quote: deletedQuote });
});

module.exports = router;
