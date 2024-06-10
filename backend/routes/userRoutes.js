const express = require('express');
const multer = require('multer');
const router = express.Router();
const { addUser, deleteUser, modifyUser, findAllUsers, filterUsers, sortUsers } = require('../services/userService');
const { getAllProjects } = require('../services/teamService');
const { isAdmin } = require('../middlewares/authMiddleware');
const { isLoggedIn } = require('../middlewares/authMiddleware');

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// GET all users
router.get('/', async (req, res) => {
  try {
    const users = await findAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET user by ID
router.get('/:userId', async (req, res) => {
  try {
    const user = await filterUsers({ id: req.params.userId });
    if (!user.length) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET all projects of a user
router.get('/:userId/projects', async (req, res) => {
  try {
    const projects = await getAllProjects(req.params.userId);
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// POST create a new user
router.post('/', isAdmin, async (req, res) => {
  try {
    const user = await addUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT update user details
router.put('/:userId', isAdmin, async (req, res) => {
  try {
    const user = await modifyUser(req.params.userId, req.body);
    if (!user[0]) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User updated successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE delete user
router.delete('/:userId', isAdmin, async (req, res) => {
  try {
    const result = await deleteUser(req.params.userId);
    if (!result) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST filter users
router.post('/filter', async (req, res) => {
  try {
    const users = await filterUsers(req.body);
    res.json(users);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// POST sort users
router.post('/sort', async (req, res) => {
  try {
    const users = await sortUsers(req.body);
    res.json(users);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post('/:userId/uploadProfilePicture', isLoggedIn, upload.single('profilePicture'), async (req, res) => {
  try {
    const userId = req.params.userId;
    const profilePicture = req.file.buffer;
    console.log(userId);
    console.log(profilePicture);
    await modifyUser(userId, { profilePicture });
    res.json({ message: 'Profile picture uploaded successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
