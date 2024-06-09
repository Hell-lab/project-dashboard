const Glossary = require('../models/Glossary');

const getAllGlossaryItems = async () => {
  return await Glossary.findAll();
};

const getGlossaryItemByKeyword = async (keyword) => {
  const glossaryItem = await Glossary.findOne({ where: { keyword } });
  if (!glossaryItem) throw new Error('Glossary item not found');
  return glossaryItem;
};

const createGlossaryItem = async (glossaryData) => {
  return await Glossary.create(glossaryData);
};

module.exports = { getAllGlossaryItems, getGlossaryItemByKeyword, createGlossaryItem };
