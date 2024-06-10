const Project = require('../models/Project');

const addProject = async (projectData) => {
  console.log(projectData);
  const createdProject = await Project.create(projectData);
  console.log("Project created successfully:", createdProject);
    // Access fields of the created project
  console.log("Project ID:", createdProject.id);
  console.log("Project Name:", createdProject.name);
  return createdProject;
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


module.exports = { addProject, modifyProject, deleteProject, findAllProjects, getProjectById, filterProjects, sortProjects };
