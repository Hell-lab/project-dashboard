const User = require('../models/User');

const addUser = async (userData) => {
  return await User.create(userData);
};

const deleteUser = async (userId) => {
  return await User.destroy({ where: { id: userId } });
};

const modifyUser = async (userId, userData) => {
  return await User.update(userData, { where: { id: userId } });
};

const findAllUsers = async () => {
  return await User.findAll();
};

const filterUsers = async (criteria) => {
  return await User.findAll({ where: criteria });
};

const sortUsers = async (orderCriteria) => {
  return await User.findAll({ order: orderCriteria });
};

const findUserByUsername = async (username) => {
  return await User.findOne({ where: { username: username } });
};



module.exports = { addUser, deleteUser, modifyUser, findAllUsers, filterUsers, sortUsers, findUserByUsername };
