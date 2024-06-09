const { sequelize } = require('../config/database');
const { DataTypes } = require('sequelize');


const Team = sequelize.define('Team', {
  projectId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
}, {
  tableName: 'team',
  timestamps: false,
});

module.exports = Team;
