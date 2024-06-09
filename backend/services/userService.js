const User = require('../models/User');

const addUser = async (userData) => {
  return await User.create(userData);
};

const deleteUser = async (userId) => {
  return await User.destroy({ where: { ID: userId } });
};

const modifyUser = async (userId, userData) => {
  return await User.update(userData, { where: { ID: userId } });
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

module.exports = { addUser, deleteUser, modifyUser, findAllUsers, filterUsers, sortUsers };
