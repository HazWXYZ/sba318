const express = require('express');
const router = express.Router();
const { categories } = require('../data');

// GET all categories
router.get('/', (req, res) => {
  res.json(categories);
});

// GET single category by ID
router.get('/:id', (req, res) => {
  const category = categories.find(c => c.id === parseInt(req.params.id));
  
  if (!category) {
    return res.status(404).json({ error: 'Category not found' });
  }
  
  res.json(category);
});

// POST create new category
router.post('/', (req, res) => {
  const { name, description } = req.body;
  
  if (!name) {
    return res.status(400).json({ error: 'Name is required' });
  }
  
  const newCategory = {
    id: categories.length > 0 ? Math.max(...categories.map(c => c.id)) + 1 : 1,
    name,
    description: description || ''
  };
  
  categories.push(newCategory);
  res.status(201).json(newCategory);
});

// PATCH update category
router.patch('/:id', (req, res) => {
  const category = categories.find(c => c.id === parseInt(req.params.id));
  
  if (!category) {
    return res.status(404).json({ error: 'Category not found' });
  }
  
  const { name, description } = req.body;
  
  if (name) category.name = name;
  if (description !== undefined) category.description = description;
  
  res.json(category);
});

// DELETE category
router.delete('/:id', (req, res) => {
  const index = categories.findIndex(c => c.id === parseInt(req.params.id));
  
  if (index === -1) {
    return res.status(404).json({ error: 'Category not found' });
  }
  
  const deletedCategory = categories.splice(index, 1)[0];
  res.json({ message: 'Category deleted', category: deletedCategory });
});

module.exports = router;
