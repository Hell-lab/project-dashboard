const { sequelize } = require('../config/database');
const { DataTypes } = require('sequelize');


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
