const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

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
}, {
  tableName: 'milestone_dict',
});

module.exports = MilestoneDict;
