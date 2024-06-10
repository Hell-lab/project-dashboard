const Team = require('../models/Team');
const User = require('../models/User');
const Project = require('../models/Project');

const getAllTeamMembers = async (projectId) => {
  try {
    const teams = await Team.findAll({
      where: { projectId },
      include: [{
        model: User,
        attributes: ['id', 'username', 'displayName', 'profilePicture']
      }]
    });

    return teams.map(team => team.User);
  } catch (error) {
    console.error('Error fetching team members:', error);
    throw error;
  }
};


const getAllProjects = async (userId) => {
  try {
    const teams = await Team.findAll({
      where: { userId },
      include: [{
        model: Project,
        attributes: ['id', 'name', 'description']
      }]
    });

    return teams.map(team => team.Project);
  } catch (error) {
    console.error('Error fetching projects:', error);
    throw error;
  }
};

const createTeam = async (projectId, ...userIds) => {
  await userIds.forEach(userId => addTeamMember(projectId, userId));
};


const addTeamMember = async (projectId, userId) => {
  const existingMember = await Team.findOne({ where: { projectId: projectId, userId: userId } });
  if (existingMember) {
    throw new Error('Team member already exists');
  }
  return await Team.create({ projectId: projectId, userId: userId });
};

const removeTeamMember = async (projectId, userId) => {
  const teamMember = await Team.findOne({ where: { projectId: projectId, userId: userId } });
  if (!teamMember) {
    throw new Error('Team member not found');
  }
  await teamMember.destroy();
  return teamMember;
};

const removeAllTeamMembers = async (projectId) => {
  const teams = await Team.findAll({ where: { projectId: projectId } });

  teams.forEach(team => team.destroy());
  return teams;
};

module.exports = { getAllTeamMembers, createTeam, addTeamMember, removeTeamMember, removeAllTeamMembers, getAllProjects };
