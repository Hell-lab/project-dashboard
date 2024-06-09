const express = require('express');
const router = express.Router();
const { getAllMilestones, getMilestoneById, createMilestone } = require('../services/milestoneDictService');
const { isAdmin } = require('../middlewares/authMiddleware');

// GET all milestones
router.get('/milestones', async (req, res) => {
  try {
    const milestones = await getAllMilestones();
    res.json(milestones);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST create a new milestone
router.post('/milestones', isAdmin, async (req, res) => {
  try {
    const milestone = await createMilestone(req.body);
    res.status(201).json(milestone);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET milestone by ID
router.get('/milestones/:milestoneId', async (req, res) => {
  try {
    const milestone = await getMilestoneById(req.params.milestoneId);
    res.json(milestone);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
