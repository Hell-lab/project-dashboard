const express = require('express');
const router = express.Router();
const Status = require('../models/Status');
const Project = require('../models/Project');
const { isAdmin, isLoggedIn } = require('../middlewares/authMiddleware');

// GET all statuses
router.get('/', async (req, res) => {
  try {
    const statuses = await Status.findAll();
    res.json(statuses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET status by ID
router.get('/:statusId', async (req, res) => {
  try {
    const status = await Status.findByPk(req.params.statusId);
    if (!status) {
      return res.status(404).json({ message: 'Status not found' });
    }
    res.json(status);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET status by project ID
router.get('/project/:projectId', async (req, res) => {
  try {
    const statuses = await Status.findAll({
      where: {
        projectId: req.params.projectId,
      }
    });
    if (!statuses) {
      return res.status(404).json({ message: 'No status found for project' });
    }
    res.json(statuses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST create a new status
router.post('/', isLoggedIn, async (req, res) => {
  try {
    const status = await Status.create(req.body);
    res.status(201).json(status);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT update status details
router.put('/:statusId', isLoggedIn, async (req, res) => {
  try {
    const status = await Status.findByPk(req.params.statusId);
    if (!status) {
      return res.status(404).json({ message: 'Status not found' });
    }
    await status.update(req.body);
    res.json(status);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE delete status
router.delete('/:statusId', isAdmin, async (req, res) => {
  try {
    const status = await Status.findByPk(req.params.statusId);
    if (!status) {
      return res.status(404).json({ message: 'Status not found' });
    }
    await status.destroy();
    res.json({ message: 'Status deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
