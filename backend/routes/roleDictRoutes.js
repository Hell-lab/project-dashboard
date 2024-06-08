const express = require('express');
const router = express.Router();
const RoleDict = require('../models/RoleDict');

// GET all roles
router.get('/roles', async (req, res) => {
  try {
    const roles = await RoleDict.findAll();
    res.json(roles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST create a new role
router.post('/roles', async (req, res) => {
  try {
    const role = await RoleDict.create(req.body);
    res.status(201).json(role);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET role by ID
router.get('/roles/:roleId', async (req, res) => {
  try {
    const role = await RoleDict.findByPk(req.params.roleId);
    if (!role) {
      return res.status(404).json({ message: 'Role not found' });
    }
    res.json(role);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
