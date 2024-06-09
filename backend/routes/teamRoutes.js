const express = require('express');
const router = express.Router();
const { getAllTeamMembers, addTeamMember, removeTeamMember } = require('../services/teamService');
const { isLoggedIn } = require('../middlewares/authMiddleware');

// GET all team members of a project
router.get('/projects/:projectId/team', async (req, res) => {
  try {
    const teamMembers = await getAllTeamMembers(req.params.projectId);
    res.json(teamMembers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST add new team member to a project
router.post('/projects/:projectId/team', isLoggedIn, async (req, res) => {
  try {
    const { projectId } = req.params;
    const { userId } = req.body;
    const teamMember = await addTeamMember(projectId, userId);
    res.status(201).json(teamMember);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE remove a team member from a project
router.delete('/projects/:projectId/team/:userId', isLoggedIn, async (req, res) => {
  try {
    const { projectId, userId } = req.params;
    await removeTeamMember(projectId, userId);
    res.json({ message: 'Team member removed successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
