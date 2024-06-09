const RoleDict = require('../models/RoleDict');

const getAllRoles = async () => {
  return await RoleDict.findAll();
};

const getRoleById = async (roleId) => {
  const role = await RoleDict.findByPk(roleId);
  if (!role) throw new Error('Role not found');
  return role;
};

const createRole = async (roleData) => {
  return await RoleDict.create(roleData);
};

module.exports = { getAllRoles, getRoleById, createRole };
