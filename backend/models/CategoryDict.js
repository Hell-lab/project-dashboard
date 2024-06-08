const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const CategoryDict = sequelize.define('CategoryDict', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'category_dict',
});

module.exports = CategoryDict;
