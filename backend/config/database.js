const { Sequelize } = require('sequelize');

// Load environment variables
const dotenv = require('dotenv');
dotenv.config();

// Create Sequelize instance
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: process.env.DB_DIALECT,
  logging: false,
});


// Seeds database with dummy data if necessary
const seedDatabase = async () => {
  const { User, Project, Status, Team, Glossary, StvDict, RoleDict, CategoryDict, MilestoneDict} = require('../models');

  const stvCount = await StvDict.count();
  if (stvCount === 0) {
    await StvDict.bulkCreate([
      {
        name: 'AI',
      },
      {
        name: 'CS',
      },
    ]);
    console.log('StVs have been added to the database.');
  }

  const roleCount = await RoleDict.count();
  if (roleCount === 0) {
    await RoleDict.bulkCreate([
      {
        name: 'admin',
      },
      {
        name: 'user',
      },
    ]);
    console.log('Roles have been added to the database.');
  }

  const categoryCount = await CategoryDict.count();
  if (categoryCount === 0) {
    await CategoryDict.bulkCreate([
      {
        name: 'Event',
      },
      {
        name: 'Service',
      },
      {
        name: 'Committee',
      },
      {
        name: 'Internal',
      },
    ]);
    console.log('Categories have been added to the database.');
  }

  const milestoneCount = await MilestoneDict.count();
  if (milestoneCount === 0) {
    await MilestoneDict.bulkCreate([
      {
        name: 'Discussing',
      },
      {
        name: 'Planning in Process',
      },
      {
        name: 'Pending Publication',
      },
      {
        name: 'Completed',
      },
      {
        name: 'Postponed',
      },
      {
        name: 'Rejected',
      },
    ]);
    console.log('Milestones have been added to the database.');
  }

  const userCount = await User.count();
  if (userCount === 0) {
    await User.bulkCreate([
      {
        username: 'felix',
        displayName: 'Felix Ferchhumer',
        stvDictId: 2,
        hashedPassword: '$2a$10$dfDOSlrZpoU7DqYx9KGbYuKKXsoblj4e953SpABzE8R2uPJddVfMC',
        roleDictId: 1,
        profilePicture: null,
      },
      {
        username: 'helena',
        displayName: 'Helena Fitze',
        stvDictId: 2,
        hashedPassword: '$2a$10$091rSL80pQfiEA6meoS2k.WYbp6/FrckidaeuASvArmDC5qBr4GOa',
        roleDictId: 2,
        profilePicture: null,
      },
      {
        username: 'david',
        displayName: 'David Fleischanderl',
        stvDictId: 1,
        hashedPassword: '$2a$10$lX5Gjn5BnrUVkywAATyLF.Ift.iQjOZy.BLVPuI66he.g.vnavsfS',
        roleDictId: 1,
        profilePicture: null,
      },
    ]);
    console.log('Default users have been added to the database.');
  }

  const projectCount = await Project.count();
  if (projectCount === 0) {
    await Project.bulkCreate([
      {
        name: 'Dummy event',
        description: 'Description of dummy event',
        categoryDictId: 1,
      },
      {
        name: 'Dummy service',
        description: 'Description of dummy service',
        categoryDictId: 2,
      },
    ]);
    console.log('Default projects have been added to the database.');
  }

  const teamCount = await Team.count();
  if (teamCount === 0) {
    await Team.bulkCreate([
      {
        projectId: 1,
        userId: 1,
      },
      {
        projectId: 1,
        userId: 2,
      },
      {
        projectId: 2,
        userId: 3,
      },
    ]);
    console.log('Project teams have been added to the database.');
  }

  const statusCount = await Status.count();
  if (statusCount === 0) {
    await Status.bulkCreate([
      {
        description: "Project was suggested.",
        since: "2024-06-09 00:00:00",
        milestoneDictId: 1,
        projectId: 1,
      },
      {
        description: "Project was accepted, team assigned.",
        since: "2024-06-09 12:00:00",
        milestoneDictId: 2,
        projectId: 1,
      },
      {
        description: "Project was suggested.",
        since: "2024-06-05 11:00:00",
        milestoneDictId: 1,
        projectId: 2,
      },
    ]);
    console.log('Status entries have been added to the database.');
  }
};

// Connection function
const connectDB = async () => {
  try {
    require('../models'); // ensures that all models have been loaded

    await sequelize.authenticate();
    console.log('Connection has been established successfully.');

    await sequelize.sync({ alter: true }); // force: true will drop the table if it already exists; alter: true will change table to match models
    console.log('All models were synchronized successfully.');

    console.log('Attempting to seed database.');
    seedDatabase();
    console.log('Seeding complete.');


  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

module.exports = { sequelize, connectDB };
