const { sequelize } = require('../config/database');
const { DataTypes } = require('sequelize');


const MilestoneDict = sequelize.define('MilestoneDict', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  tableName: 'milestone_dict',
  timestamps: false,
});

module.exports = MilestoneDict;
