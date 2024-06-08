// backend/middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, 'your_jwt_secret_key', (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user) return res.sendStatus(401); // Ensure user is authenticated
    if (!roles.includes(req.user.role)) return res.sendStatus(403); // Check if the user's role is authorized
    next();
  };
};

module.exports = { authenticateToken, authorizeRoles };
