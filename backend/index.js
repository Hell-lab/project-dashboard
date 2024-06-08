const express = require('express');
const cors = require('cors');
const { connectDB, syncDB } = require('.config/database');
const app = express();
const port = process.env.PORT || 3000;


app.use(express.json());
app.use(cors())

const userRoutes = require('./routes/userRoutes');
const teamRoutes = require('./routes/teamRoutes');
const stvDictRoutes = require('./routes/stvDictRoutes');
const statusRoutes = require('./routes/statusRoutes');
const roleDictRoutes = require('./routes/roleDictRoutes');
const projectRoutes = require('./routes/projectRoutes');
const milestoneDictRoutes = require('./routes/milestoneDictRoutes');
const glossaryRoutes = require('./routes/glossaryRoutes');
const categoryDictRoutes = require('./routes/categoryeDictRoutes');


app.use('/api/users', userRoutes);
app.use('/api/team', teamRoutes);
app.use('/api/stvDict', stvDictRoutes);
app.use('/api/status', statusRoutes);
app.use('/api/roleDict', roleDictRoutes);
app.use('/api/project', projectRoutes);
app.use('/api/milestoneDict', milestoneDictRoutes);
app.use('/api/glossary', glossaryRoutes);
app.use('/api/categoryDict', categoryDictRoutes);


const startServer = async () => {
  try {
    await connectDB();
    await syncDB();
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
  }
};

startServer();

module.exports = app;
