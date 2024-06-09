const { sequelize } = require('../config/database');
const { DataTypes } = require('sequelize');


const RoleDict = sequelize.define('RoleDict', {
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
  tableName: 'role_dict',
});

module.exports = RoleDict;
