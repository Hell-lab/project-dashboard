const MilestoneDict = require('../models/MilestoneDict');

const milestoneDictController = {
  getAllMilestones: async (req, res) => {
    try {
      const milestones = await MilestoneDict.findAll();
      res.json(milestones);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getMilestoneById: async (req, res) => {
    try {
      const milestone = await MilestoneDict.findByPk(req.params.milestoneId);
      if (!milestone) {
        return res.status(404).json({ message: 'Milestone not found' });
      }
      res.json(milestone);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  addMilestone: async (req, res) => {
    try {
      const milestone = await MilestoneDict.create(req.body);
      res.status(201).json(milestone);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  updateMilestone: async (req, res) => {
    try {
      const milestone = await MilestoneDict.findByPk(req.params.milestoneId);
      if (!milestone) {
        return res.status(404).json({ message: 'Milestone not found' });
      }
      await milestone.update(req.body);
      res.json(milestone);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  deleteMilestone: async (req, res) => {
    try {
      const milestone = await MilestoneDict.findByPk(req.params.milestoneId);
      if (!milestone) {
        return res.status(404).json({ message: 'Milestone not found' });
      }
      await milestone.destroy();
      res.json({ message: 'Milestone deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = milestoneDictController;
