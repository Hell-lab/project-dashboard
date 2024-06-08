const RoleDict = require('../models/RoleDict');

const roleDictController = {
  getAllRoles: async (req, res) => {
    try {
      const roles = await RoleDict.findAll();
      res.json(roles);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getRoleById: async (req, res) => {
    try {
      const role = await RoleDict.findByPk(req.params.roleId);
      if (!role) {
        return res.status(404).json({ message: 'Role not found' });
      }
      res.json(role);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  addRole: async (req, res) => {
    try {
      const role = await RoleDict.create(req.body);
      res.status(201).json(role);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  updateRole: async (req, res) => {
    try {
      const role = await RoleDict.findByPk(req.params.roleId);
      if (!role) {
        return res.status(404).json({ message: 'Role not found' });
      }
      await role.update(req.body);
      res.json(role);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  deleteRole: async (req, res) => {
    try {
      const role = await RoleDict.findByPk(req.params.roleId);
      if (!role) {
        return res.status(404).json({ message: 'Role not found' });
      }
      await role.destroy();
      res.json({ message: 'Role deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = roleDictController;
