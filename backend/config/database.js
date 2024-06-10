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
        name: 'Admin',
      },
      {
        name: 'User',
      },
      {
        name: 'Retired',
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
        description: 'The project has been suggested. We are now figuring out if we have the resources to implement it.'
      },
      {
        name: 'Planning in Process',
        description: 'We are working on the project.'
      },
      {
        name: 'Pending Publication',
        description: 'The project is done, we are waiting to share it with you.'
      },
      {
        name: 'Completed',
        description: 'We are completely done with the project.'
      },
      {
        name: 'Postponed',
        description: 'We cannot work on the project in the near future and have therefore postponed it. It will be revisited periodically, see status information for more details.'
      },
      {
        name: 'Rejected',
        description: 'The project idea has been rejected. See status information for more details.'
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
      {
        username: 'markus',
        displayName: 'Markus Weninger',
        stvDictId: 2,
        hashedPassword: null,
        roleDictId: 3,
        profilePicture: null,
      },
    ]);
    console.log('Default users have been added to the database.');
  }

  const projectCount = await Project.count();
  if (projectCount === 0) {
    await Project.bulkCreate([
      {
        name: 'WebDev-Projekt',
        description: 'Das hübsche Design des WebDev-Projekts bewundern.',
        categoryDictId: 1,
      },
      {
        name: 'Kuchen backen',
        description: 'Lehrende mit Essen bestechen',
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
        projectId: 1,
        userId: 4,
      },
      {
        projectId: 2,
        userId: 3,
      },
      {
        projectId: 2,
        userId: 2,
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

    console.log('Seeding complete.');

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

  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

module.exports = { sequelize, connectDB };
