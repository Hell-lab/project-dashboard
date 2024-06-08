const Team = require('../models/Team');

const teamController = {
  getAllTeamMembers: async (req, res) => {
    try {
      const teamMembers = await Team.findAll({ where: { projectId: req.params.projectId } });
      res.json(teamMembers);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  addTeamMember: async (req, res) => {
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
  },

  removeTeamMember: async (req, res) => {
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
  }
};

module.exports = teamController;
