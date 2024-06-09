const express = require('express');
const router = express.Router();
const { getAllCategories, getCategoryById, createCategory } = require('../services/categoryDictService');
const { isAdmin } = require('../middlewares/authMiddleware');

// GET all categories
router.get('/categories', async (req, res) => {
  try {
    const categories = await getAllCategories();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST create a new category
router.post('/categories', isAdmin, async (req, res) => {
  try {
    const category = await createCategory(req.body);
    res.status(201).json(category);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET category by ID
router.get('/categories/:categoryId', async (req, res) => {
  try {
    const category = await getCategoryById(req.params.categoryId);
    res.json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
