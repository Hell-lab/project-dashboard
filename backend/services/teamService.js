const Team = require('../models/Team');

const getAllTeamMembers = async (projectId) => {
  return await Team.findAll({ where: { PROJECT_ID: projectId } });
};

const addTeamMember = async (projectId, userId) => {
  const existingMember = await Team.findOne({ where: { PROJECT_ID: projectId, USER_ID: userId } });
  if (existingMember) {
    throw new Error('Team member already exists');
  }
  return await Team.create({ PROJECT_ID: projectId, USER_ID: userId });
};

const removeTeamMember = async (projectId, userId) => {
  const teamMember = await Team.findOne({ where: { PROJECT_ID: projectId, USER_ID: userId } });
  if (!teamMember) {
    throw new Error('Team member not found');
  }
  await teamMember.destroy();
  return teamMember;
};

module.exports = { getAllTeamMembers, addTeamMember, removeTeamMember };
