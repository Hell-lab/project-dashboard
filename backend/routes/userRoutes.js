const express = require('express');
const router = express.Router();
const { addUser, deleteUser, modifyUser, findAllUsers, filterUsers, sortUsers } = require('../services/userService');
const { isAdmin } = require('../middlewares/authMiddleware');

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
    const user = await findAllUsers({ ID: req.params.userId });
    if (!user.length) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user[0]);
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

// login endpoint
router.post('/login', async function(req, res) {
  const { mail, pw } = req.body;
  if (!mail || !pw) {
      return res.status(400).send({ status: 'fail', message: 'Missing email or password' });
  }

  try {
      const user = await db.user.findUserByEmail(mail);
      if (user && await bcrypt.compare(pw, user.pw)) {
          const token = jwt.sign({ userMail: user.mail, userIsAdmin: user.mail.toLowerCase().startsWith('admin') }, jwtSecret, { expiresIn: '1h' });
          res.send({ status: 'success', message: 'Login successful', token: token, expiresAt: Date.now() + 3600000});
      } else {
          res.status(401).send({ status: 'fail', message: 'Invalid credentials' });
      }
  } catch (error) {
      res.status(500).send({ status: 'fail', message: 'Server error' });
  }
});

module.exports = router;
