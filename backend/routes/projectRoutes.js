const express = require('express');
const router = express.Router();
const { addProject, findAllProjects, getProjectById, deleteProject, modifyProject } = require('../services/projectService');
const { isLoggedIn } = require('../middlewares/authMiddleware');

// GET all projects
router.get('/', async (req, res) => {
  try {
    const projects = await findAllProjects();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET project by ID
router.get('/:projectId', async (req, res) => {
  try {
    const project = await getProjectById(req.params.projectId);
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST create a new project
router.post('/', isLoggedIn, async (req, res) => {
  try {
    const project = await addProject(req.body);
    res.status(201).json(project);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT update project details
router.put('/:projectId', isLoggedIn, async (req, res) => {
  try {
    const project = await modifyProject(req.params.projectId, req.body);
    res.json(project);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE delete project
router.delete('/:projectId', isLoggedIn, async (req, res) => {
  try {
    await deleteProject(req.params.projectId);
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
