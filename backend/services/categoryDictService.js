const CategoryDict = require('../models/CategoryDict');

const getAllCategories = async () => {
  return await CategoryDict.findAll();
};

const getCategoryById = async (categoryId) => {
  const category = await CategoryDict.findByPk(categoryId);
  if (!category) throw new Error('Category not found');
  return category;
};

const createCategory = async (categoryData) => {
  return await CategoryDict.create(categoryData);
};

module.exports = { getAllCategories, getCategoryById, createCategory };