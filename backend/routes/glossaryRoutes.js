const express = require('express');
const router = express.Router();
const { getAllGlossaryItems, getGlossaryItemByKeyword, createGlossaryItem } = require('../services/glossaryService');
const { isLoggedIn } = require('../middlewares/authMiddleware');

// GET all glossary items
router.get('/glossary', async (req, res) => {
  try {
    const glossaryItems = await getAllGlossaryItems();
    res.json(glossaryItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST add new glossary item
router.post('/glossary', isLoggedIn, async (req, res) => {
  try {
    const glossaryItem = await createGlossaryItem(req.body);
    res.status(201).json(glossaryItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET glossary item by keyword
router.get('/glossary/:keyword', async (req, res) => {
  try {
    const glossaryItem = await getGlossaryItemByKeyword(req.params.keyword);
    res.json(glossaryItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;