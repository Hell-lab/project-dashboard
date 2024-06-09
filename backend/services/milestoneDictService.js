const MilestoneDict = require('../models/MilestoneDict');

const getAllMilestones = async () => {
  return await MilestoneDict.findAll();
};

const getMilestoneById = async (milestoneId) => {
  const milestone = await MilestoneDict.findByPk(milestoneId);
  if (!milestone) throw new Error('Milestone not found');
  return milestone;
};

const createMilestone = async (milestoneData) => {
  return await MilestoneDict.create(milestoneData);
};

module.exports = { getAllMilestones, getMilestoneById, createMilestone };
