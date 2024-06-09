const Status = require('../models/Status');

const addStatus = async (statusData) => {
  return await Status.create(statusData);
};

const modifyStatus = async (statusId, statusData) => {
  return await Status.update(statusData, { where: { ID: statusId } });
};

const deleteStatus = async (statusId) => {
  return await Status.destroy({ where: { ID: statusId } });
};

const findAllStatus = async () => {
  return await Status.findAll();
};

const filterStatus = async (criteria) => {
  return await Status.findAll({ where: criteria });
};

const sortStatus = async (orderCriteria) => {
  return await Status.findAll({ order: orderCriteria });
};



module.exports = { addStatus, modifyStatus, deleteStatus, findAllStatus, filterStatus, sortStatus };
