const express = require('express');
const router = express.Router();
const CategoryDict = require('../models/CategoryDict');
const { authenticateToken, authorizeRoles } = require('../middlewares/authMiddleware');

// GET all categories
router.get('/categories', async (req, res) => {
  try {
    const categories = await CategoryDict.findAll();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST create a new category
router.post('/categories', authenticateToken, authorizeRoles('admin'), async (req, res) => {
  try {
    const category = await CategoryDict.create(req.body);
    res.status(201).json(category);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET category by ID
router.get('/categories/:categoryId', async (req, res) => {
  try {
    const category = await CategoryDict.findByPk(req.params.categoryId);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
