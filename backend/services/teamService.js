const Team = require('../models/Team');
const User = require('../models/User');

const getAllTeamMembers = async (projectId) => {
  try {
    return await Team.findAll({
      where: { projectId },
      include: [{
        model: User,
        attributes: ['id', 'username', 'displayName', 'profilePicture']
      }]
    });
  } catch (error) {
    console.error('Error fetching team members:', error);
    throw error;
  }
};

const addTeamMember = async (projectId, userId) => {
  const existingMember = await Team.findOne({ where: { PROJECTID: projectId, USERID: userId } });
  if (existingMember) {
    throw new Error('Team member already exists');
  }
  return await Team.create({ PROJECTID: projectId, USERID: userId });
};

const removeTeamMember = async (projectId, userId) => {
  const teamMember = await Team.findOne({ where: { PROJECTID: projectId, USERID: userId } });
  if (!teamMember) {
    throw new Error('Team member not found');
  }
  await teamMember.destroy();
  return teamMember;
};

module.exports = { getAllTeamMembers, addTeamMember, removeTeamMember };
