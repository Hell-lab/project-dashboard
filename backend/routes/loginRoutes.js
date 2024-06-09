const express = require('express');
const router = express.Router();
const { findUserByUsername } = require('../services/userService');

// login endpoint
router.post('/', async function(req, res) {
    const { username, pw } = req.body;
    if (!username || !pw) {
        return res.status(400).send({ status: 'fail', message: 'Missing username or password' });
    }

    try {
        const user = await findUserByUsername(username);
        if (user && await bcrypt.compare(pw, user.pw)) {
            const token = jwt.sign({ username: user.username, userIsAdmin: user.roleDictId == 0 }, jwtSecret, { expiresIn: '1h' });
            res.send({ status: 'success', message: 'Login successful', token: token, expiresAt: Date.now() + 3600000 });
        } else {
            res.status(401).send({ status: 'fail', message: 'Invalid credentials' });
        }
    } catch (error) {
        res.status(500).send({ status: 'fail', message: 'Server error' });
    }
  });

  module.exports = router;
