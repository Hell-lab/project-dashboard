const express = require('express');
const router = express.Router();
const { getAllItems, getItemById, createItem } = require('../services/stvDictService');
const { isAdmin } = require('../middlewares/authMiddleware');

// GET all items in the StvDict
router.get('/', async (req, res) => {
  try {
    const items = await getAllItems();
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST create a new item in the StvDict
router.post('/', isAdmin, async (req, res) => {
  try {
    const item = await createItem(req.body);
    res.status(201).json(item);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET item in the StvDict by ID
router.get('/:id', async (req, res) => {
  try {
    const item = await getItemById(req.params.id);
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
