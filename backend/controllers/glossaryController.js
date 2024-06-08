const Glossary = require('../models/Glossary');

const glossaryController = {
  getAllKeywords: async (req, res) => {
    try {
      const keywords = await Glossary.findAll();
      res.json(keywords);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getKeywordByKeyword: async (req, res) => {
    try {
      const keyword = await Glossary.findOne({ where: { keyword: req.params.keyword } });
      if (!keyword) {
        return res.status(404).json({ message: 'Keyword not found' });
      }
      res.json(keyword);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  addKeyword: async (req, res) => {
    try {
      const keyword = await Glossary.create(req.body);
      res.status(201).json(keyword);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  updateKeyword: async (req, res) => {
    try {
      const keyword = await Glossary.findOne({ where: { keyword: req.params.keyword } });
      if (!keyword) {
        return res.status(404).json({ message: 'Keyword not found' });
      }
      await keyword.update(req.body);
      res.json(keyword);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  deleteKeyword: async (req, res) => {
    try {
      const keyword = await Glossary.findOne({ where: { keyword: req.params.keyword } });
      if (!keyword) {
        return res.status(404).json({ message: 'Keyword not found' });
      }
      await keyword.destroy();
      res.json({ message: 'Keyword deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = glossaryController;
