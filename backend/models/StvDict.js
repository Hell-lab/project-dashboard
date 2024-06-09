const { sequelize } = require('../config/database');
const { DataTypes } = require('sequelize');


const StvDict = sequelize.define('StvDict', {
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
  tableName: 'stv_dict',
  timestamps: false,
});

module.exports = StvDict;
