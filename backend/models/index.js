const sequelize = require('../config/database');
const User = require('./User');
const Project = require('./Project');
const Status = require('./Status');
const Team = require('./Team');
const Glossary = require('./Glossary');
const StvDict = require('./StvDict');
const RoleDict = require('./RoleDict');
const CategoryDict = require('./CategoryDict');
const MilestoneDict = require('./MilestoneDict');

// Define associations here
Project.belongsTo(CategoryDict, { foreignKey: 'categoryDictId' });
Status.belongsTo(Project, { foreignKey: 'projectId' });
Status.belongsTo(MilestoneDict, { foreignKey: 'milestoneDictId' });
Team.belongsTo(Project, { foreignKey: 'projectId' });
Team.belongsTo(User, { foreignKey: 'userId' });

module.exports = {
  User,
  Project,
  Status,
  Team,
  Glossary,
  StvDict,
  RoleDict,
  CategoryDict,
  MilestoneDict,
};
