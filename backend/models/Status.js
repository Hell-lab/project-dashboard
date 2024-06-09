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
    allowNull: false,
  },
  since: {
    type: DataTypes.DATE,
    allowNull: false,
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
