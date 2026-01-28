const express = require('express');
const router = express.Router();
const { authors } = require('../data');

// GET all authors (with optional birth year filtering)
router.get('/', (req, res) => {
  let filteredAuthors = [...authors];
  
  // Filter by minimum birth year if query parameter exists
  if (req.query.birthYear) {
    const year = parseInt(req.query.birthYear);
    filteredAuthors = filteredAuthors.filter(a => a.birthYear >= year);
  }
  
  res.json(filteredAuthors);
});

// GET single author by ID
router.get('/:id', (req, res) => {
  const author = authors.find(a => a.id === parseInt(req.params.id));
  
  if (!author) {
    return res.status(404).json({ error: 'Author not found' });
  }
  
  res.json(author);
});

// POST create new author
router.post('/', (req, res) => {
  const { name, bio, birthYear } = req.body;
  
  if (!name) {
    return res.status(400).json({ error: 'Name is required' });
  }
  
  const newAuthor = {
    id: authors.length > 0 ? Math.max(...authors.map(a => a.id)) + 1 : 1,
    name,
    bio: bio || '',
    birthYear: birthYear ? parseInt(birthYear) : null
  };
  
  authors.push(newAuthor);
  res.status(201).json(newAuthor);
});

// PATCH update author
router.patch('/:id', (req, res) => {
  const author = authors.find(a => a.id === parseInt(req.params.id));
  
  if (!author) {
    return res.status(404).json({ error: 'Author not found' });
  }
  
  const { name, bio, birthYear } = req.body;
  
  if (name) author.name = name;
  if (bio !== undefined) author.bio = bio;
  if (birthYear) author.birthYear = parseInt(birthYear);
  
  res.json(author);
});

// DELETE author
router.delete('/:id', (req, res) => {
  const index = authors.findIndex(a => a.id === parseInt(req.params.id));
  
  if (index === -1) {
    return res.status(404).json({ error: 'Author not found' });
  }
  
  const deletedAuthor = authors.splice(index, 1)[0];
  res.json({ message: 'Author deleted', author: deletedAuthor });
});

module.exports = router;
