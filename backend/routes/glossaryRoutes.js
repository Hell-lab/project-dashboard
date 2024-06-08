const express = require('express');
const router = express.Router();
const Glossary = require('../models/Glossary');

// GET all glossary items
router.get('/glossary', async (req, res) => {
  try {
    const glossaryItems = await Glossary.findAll();
    res.json(glossaryItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST add new glossary item
router.post('/glossary', async (req, res) => {
  try {
    const glossaryItem = await Glossary.create(req.body);
    res.status(201).json(glossaryItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET glossary item by keyword
router.get('/glossary/:keyword', async (req, res) => {
  try {
    const glossaryItem = await Glossary.findOne({ where: { keyword: req.params.keyword } });
    if (!glossaryItem) {
      return res.status(404).json({ message: 'Glossary item not found' });
    }
    res.json(glossaryItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
