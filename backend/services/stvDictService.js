const StvDict = require('../models/StvDict');

const getAllItems = async () => {
  return await StvDict.findAll();
};

const getItemById = async (itemId) => {
  const item = await StvDict.findByPk(itemId);
  if (!item) throw new Error('Item not found');
  return item;
};

const createItem = async (itemData) => {
  return await StvDict.create(itemData);
};

module.exports = { getAllItems, getItemById, createItem };
