const express = require('express');
const router = express.Router();
const StvDict = require('../models/StvDict');

// GET all items in the StvDict
router.get('/stvDict', async (req, res) => {
  try {
    const items = await StvDict.findAll();
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST create a new item in the StvDict
router.post('/stvDict', async (req, res) => {
  try {
    const item = await StvDict.create(req.body);
    res.status(201).json(item);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET item in the StvDict by ID
router.get('/stvDict/:id', async (req, res) => {
  try {
    const item = await StvDict.findByPk(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
