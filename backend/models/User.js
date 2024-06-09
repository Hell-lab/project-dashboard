const { sequelize } = require('../config/database');
const { DataTypes } = require('sequelize');


const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  displayName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  stvDictId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  hashedPassword: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  roleDictId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  profilePicture: {
    type: DataTypes.BLOB,
    allowNull: true,
  },
}, {
  tableName: 'user',
});

module.exports = User;
