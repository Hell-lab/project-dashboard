const express = require('express');
const router = express.Router();
const { getAllRoles, getRoleById, createRole } = require('../services/roleDictService');
const { isAdmin } = require('../middlewares/authMiddleware');

// GET all roles
router.get('/', async (req, res) => {
  try {
    const roles = await getAllRoles();
    res.json(roles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST create a new role
router.post('/', isAdmin, async (req, res) => {
  try {
    const role = await createRole(req.body);
    res.status(201).json(role);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET role by ID
router.get('/:roleId', async (req, res) => {
  try {
    const role = await getRoleById(req.params.roleId);
    res.json(role);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
