const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Glossary = sequelize.define('Glossary', {
  keyword: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'glossary',
});

module.exports = Glossary;
