const express = require('express');
const router = express.Router();
const { addProject, findAllProjects, getProjectById, deleteProject, modifyProject } = require('../services/projectService');
const { getAllTeamMembers, addTeamMember, removeTeamMember, removeAllTeamMembers } = require('../services/teamService');
const { notifyClients } = require('../services/websocketService');
const { isLoggedIn, isAdmin } = require('../middlewares/authMiddleware');

// GET all projects
router.get('/', async (req, res) => {
  try {
    const projects = await findAllProjects();
    res.json(projects);
    notifyClients('Fetching some projects');
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
    notifyClients({ type: 'project-added', project });
    res.status(201).json(project);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT update project details
router.put('/:projectId', isLoggedIn, async (req, res) => {
  try {
    const project = await modifyProject(req.params.projectId, req.body);
    notifyClients({ type: 'project-updated', project });
    res.json(project);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE delete project
router.delete('/:projectId', isAdmin, async (req, res) => {
  try {
    await deleteProject(req.params.projectId);
    notifyClients({ type: 'project-deleted' });
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET all team members of a project
router.get('/:projectId/team', async (req, res) => {
  try {
    const teamMembers = await getAllTeamMembers(req.params.projectId);

    if (!teamMembers.length) {
      return res.status(404).json({ message: 'No team members found for project' });
    }

    res.json(teamMembers);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ADD members to a team
router.post('/:projectId/team', isLoggedIn, async (req, res) => {
  try {
    const { projectId } = req.params;
    const { userId } = req.body;
    const teamMember = await addTeamMember(projectId, userId);
    res.status(201).json(teamMember);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE all team member from a project
router.delete('/:projectId/team', isAdmin, async (req, res) => {
  try {
    const { projectId } = req.params;
    await removeAllTeamMembers(projectId);
    res.json({ message: 'Team member removed successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE remove a team member from a project
router.delete('/:projectId/team/:userId', isLoggedIn, async (req, res) => {
  try {
    const { projectId, userId } = req.params;
    await removeTeamMember(projectId, userId);
    res.json({ message: 'Team member removed successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
