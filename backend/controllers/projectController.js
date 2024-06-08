const Project = require('../models/Project');

const projectController = {
  getAllProjects: async (req, res) => {
    try {
      const projects = await Project.findAll();
      res.json(projects);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getProjectById: async (req, res) => {
    try {
      const project = await Project.findByPk(req.params.projectId);
      if (!project) {
        return res.status(404).json({ message: 'Project not found' });
      }
      res.json(project);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  addProject: async (req, res) => {
    try {
      const project = await Project.create(req.body);
      res.status(201).json(project);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  updateProject: async (req, res) => {
    try {
      const project = await Project.findByPk(req.params.projectId);
      if (!project) {
        return res.status(404).json({ message: 'Project not found' });
      }
      await project.update(req.body);
      res.json(project);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  deleteProject: async (req, res) => {
    try {
      const project = await Project.findByPk(req.params.projectId);
      if (!project) {
        return res.status(404).json({ message: 'Project not found' });
      }
      await project.destroy();
      res.json({ message: 'Project deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = projectController;
