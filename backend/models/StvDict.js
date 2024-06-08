const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

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
});

module.exports = StvDict;
