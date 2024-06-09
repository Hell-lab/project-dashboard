const { sequelize } = require('../config/database');
const { DataTypes } = require('sequelize');


const Project = sequelize.define('Project', {
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
  categoryDictId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'project',
  timestamps: false,
});

module.exports = Project;
