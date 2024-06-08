const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const { authenticateToken, authorizeRoles } = require('../middlewares/authMiddleware');

// GET all projects
router.get('/', async (req, res) => {
  try {
    const projects = await Project.findAll();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET project by ID
router.get('/:projectId', async (req, res) => {
  try {
    const project = await Project.findByPk(req.params.projectId);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST create a new project
router.post('/', authenticateToken, authorizeRoles('user', 'admin'), async (req, res) => {
  try {
    const project = await Project.create(req.body);
    res.status(201).json(project);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT update project details
router.put('/:projectId', authenticateToken, authorizeRoles('user', 'admin'), async (req, res) => {
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
});

// DELETE delete project
router.delete('/:projectId', authenticateToken, authorizeRoles('user', 'admin'), async (req, res) => {
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
});

module.exports = router;
