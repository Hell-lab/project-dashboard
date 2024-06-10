require('dotenv').config();

const express = require('express');

var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const WebSocket = require('ws');

var jwt = require('jsonwebtoken');

const jwtSecret = process.env.JWT_SECRET;
if (!jwtSecret) {
    console.error('FATAL ERROR: JWT_SECRET env var is not defined.');
    process.exit(1); // Exit the process with an error code
}

const cors = require('cors');
const { connectDB } = require('./config/database');

const loginRoutes = require('./routes/loginRoutes');
const userRoutes = require('./routes/userRoutes');
const stvDictRoutes = require('./routes/stvDictRoutes');
const statusRoutes = require('./routes/statusRoutes');
const roleDictRoutes = require('./routes/roleDictRoutes');
const projectRoutes = require('./routes/projectRoutes');
const milestoneDictRoutes = require('./routes/milestoneDictRoutes');
const glossaryRoutes = require('./routes/glossaryRoutes');
const categoryDictRoutes = require('./routes/categoryDictRoutes');

const app = express();
const port = process.env.PORT || 3000;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())


function verifyRequest(req) {
  let token = req.headers['authorization'];
  req.jwtProvided = false;
  req.jwtVerifyError = false;
  req.jwtExpired = false;
  req.jwtPayload = null;

  if (token) {
      console.log(`> Authorization: Token "${token}" provided as Authorization-header`)
      token = token.replace("Bearer ", "")
      req.jwtProvided = true;
      jwt.verify(token, jwtSecret, (err, decoded) => {
          if (err) {
              req.jwtVerifyError = true;
              // Check if the error is because the JWT has expired
              if (err.name === 'TokenExpiredError') {
                  req.jwtExpired = true;
              }
          } else {
              req.jwtPayload = decoded;
          }
      });
  }
}

function verifyMiddleware(req, res, next) {
//console.log(`Verify token on request to ${req.url}`)
verifyRequest(req)
if(!req.jwtProvided) {
  //console.log(`>>> Not authorized, no token provided`)
} else if(req.jwtProvided && !req.jwtVerifyError) {
  //console.log(`>>> Authorized`)
} else if(req.jwtProvided && req.jwtVerifyError && req.jwtExpired) {
  //console.log(`>>> Not authorized, token expired`)
} else {
  //console.log(`>>> Not authorized, error during token verification`)
}
next()
}

app.use('/login', loginRoutes);

// Apply the verifyMiddleware middleware to all routes
// The order of our middlewares matters: If we put this before
// setting up our express.static middleware, JWT would even be checked
// for every static resource, which would introduce unnecessary overhead.
app.use(verifyMiddleware);

app.use('/api/users', userRoutes);
app.use('/api/stvs', stvDictRoutes);
app.use('/api/statuses', statusRoutes);
app.use('/api/roles', roleDictRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/milestones', milestoneDictRoutes);
app.use('/api/glossary', glossaryRoutes);
app.use('/api/categories', categoryDictRoutes);


const startServer = async () => {
  try {
    await connectDB();
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
  }
};

startServer();

module.exports = app;
