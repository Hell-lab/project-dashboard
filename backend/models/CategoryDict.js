const { sequelize } = require('../config/database');
const { DataTypes } = require('sequelize');


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
  timestamps: false,
});

module.exports = CategoryDict;
