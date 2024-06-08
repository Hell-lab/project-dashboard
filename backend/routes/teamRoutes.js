const express = require('express');
const router = express.Router();
const Team = require('../models/Team');
const { authenticateToken, authorizeRoles } = require('../middlewares/authMiddleware');

// GET all team members of a project
router.get('/projects/:projectId/team', async (req, res) => {
  try {
    const teamMembers = await Team.findAll({ where: { projectId: req.params.projectId } });
    res.json(teamMembers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST add new team member to a project
router.post('/projects/:projectId/team', authenticateToken, authorizeRoles('user', 'admin'), async (req, res) => {
  try {
    const { projectId } = req.params;
    const { userId } = req.body;
    const existingMember = await Team.findOne({ where: { projectId, userId } });
    if (existingMember) {
      return res.status(400).json({ message: 'Team member already exists' });
    }
    const teamMember = await Team.create({ projectId, userId });
    res.status(201).json(teamMember);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE remove a team member from a project
router.delete('/projects/:projectId/team/:userId', authenticateToken, authorizeRoles('user', 'admin'), async (req, res) => {
  try {
    const { projectId, userId } = req.params;
    const teamMember = await Team.findOne({ where: { projectId, userId } });
    if (!teamMember) {
      return res.status(404).json({ message: 'Team member not found' });
    }
    await teamMember.destroy();
    res.json({ message: 'Team member removed successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
