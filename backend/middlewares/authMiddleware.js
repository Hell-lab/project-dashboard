// backend/middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');

// Middleware to check if user is logged in
function isLoggedIn(req, res, next) {
  if (!req.jwtProvided) {
    console.log("> Denied: Authentication required");
    return res.status(401).send('Authentication required');
  } else if (req.jwtVerifyError || req.jwtExpired) {
    console.log("> Denied: Invalid authentication token");
    return res.status(401).send('Invalid authentication token');
  } else {
    console.log("> User is logged in, action can be performed.");
  }
  next();
}

function isAdmin(req, res, next) {
  if (req.jwtPayload && req.jwtPayload.userIsAdmin) {
    console.log("> User is Admin, action can be performed.");
    next();
  } else {
    console.log("> Denied: Admin privileges required");
    res.status(403).send('Admin privileges required');
  }
}

module.exports = { isLoggedIn, isAdmin };
