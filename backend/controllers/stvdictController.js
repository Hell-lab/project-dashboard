const StvDict = require('../models/StvDict');

const stvDictController = {
  getAllItems: async (req, res) => {
    try {
      const items = await StvDict.findAll();
      res.json(items);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getItemById: async (req, res) => {
    try {
      const item = await StvDict.findByPk(req.params.itemId);
      if (!item) {
        return res.status(404).json({ message: 'Item not found' });
      }
      res.json(item);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  addItem: async (req, res) => {
    try {
      const item = await StvDict.create(req.body);
      res.status(201).json(item);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  updateItem: async (req, res) => {
    try {
      const item = await StvDict.findByPk(req.params.itemId);
      if (!item) {
        return res.status(404).json({ message: 'Item not found' });
      }
      await item.update(req.body);
      res.json(item);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  deleteItem: async (req, res) => {
    try {
      const item = await StvDict.findByPk(req.params.itemId);
      if (!item) {
        return res.status(404).json({ message: 'Item not found' });
      }
      await item.destroy();
      res.json({ message: 'Item deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = stvDictController;
