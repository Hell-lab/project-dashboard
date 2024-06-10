const { sequelize } = require('../config/database');
const { DataTypes } = require('sequelize');


const Status = sequelize.define('Status', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  since: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: DataTypes.NOW,
  },
  milestoneDictId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  projectId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'status',
  timestamps: false,
});

module.exports = Status;
