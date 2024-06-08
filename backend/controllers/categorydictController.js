const CategoryDict = require('../models/CategoryDict');

const categoryDictController = {
  getAllCategories: async (req, res) => {
    try {
      const categories = await CategoryDict.findAll();
      res.json(categories);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getCategoryById: async (req, res) => {
    try {
      const category = await CategoryDict.findByPk(req.params.categoryId);
      if (!category) {
        return res.status(404).json({ message: 'Category not found' });
      }
      res.json(category);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  addCategory: async (req, res) => {
    try {
      const category = await CategoryDict.create(req.body);
      res.status(201).json(category);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  updateCategory: async (req, res) => {
    try {
      const category = await CategoryDict.findByPk(req.params.categoryId);
      if (!category) {
        return res.status(404).json({ message: 'Category not found' });
      }
      await category.update(req.body);
      res.json(category);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  deleteCategory: async (req, res) => {
    try {
      const category = await CategoryDict.findByPk(req.params.categoryId);
      if (!category) {
        return res.status(404).json({ message: 'Category not found' });
      }
      await category.destroy();
      res.json({ message: 'Category deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = categoryDictController;
