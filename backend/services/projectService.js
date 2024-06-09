const Project = require('../models/Project');
const Team = require('../models/Team');

const addProject = async (projectData) => {
  return await Project.create(projectData);
};

const modifyProject = async (projectId, projectData) => {
  return await Project.update(projectData, { where: { ID: projectId } });
};

const deleteProject = async (projectId) => {
    const project = await Project.findByPk(projectId);
    if (!project) throw new Error('Project not found');
    await project.destroy();
    return project;
  };

const findAllProjects = async () => {
  return await Project.findAll();
};

const getProjectById = async (projectId) => {
    const project = await Project.findByPk(projectId);
    if (!project) throw new Error('Project not found');
    return project;
  };

const filterProjects = async (criteria) => {
  return await Project.findAll({ where: criteria });
};

const sortProjects = async (orderCriteria) => {
  return await Project.findAll({ order: orderCriteria });
};

const addTeamMember = async (projectId, userId) => {
    return await Team.create({ PROJECT_ID: projectId, USER_ID: userId });
  };
  
  const deleteTeamMember = async (projectId, userId) => {
    return await Team.destroy({ where: { PROJECT_ID: projectId, USER_ID: userId } });
  };

module.exports = { addProject, modifyProject, deleteProject, findAllProjects, getProjectById, filterProjects, sortProjects, addTeamMember, deleteTeamMember };
