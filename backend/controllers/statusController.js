const Status = require('../models/Status');

const statusController = {
  getAllStatuses: async (req, res) => {
    try {
      const statuses = await Status.findAll();
      res.json(statuses);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getStatusById: async (req, res) => {
    try {
      const status = await Status.findByPk(req.params.statusId);
      if (!status) {
        return res.status(404).json({ message: 'Status not found' });
      }
      res.json(status);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  addStatus: async (req, res) => {
    try {
      const status = await Status.create(req.body);
      res.status(201).json(status);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  updateStatus: async (req, res) => {
    try {
      const status = await Status.findByPk(req.params.statusId);
      if (!status) {
        return res.status(404).json({ message: 'Status not found' });
      }
      await status.update(req.body);
      res.json(status);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  deleteStatus: async (req, res) => {
    try {
      const status = await Status.findByPk(req.params.statusId);
      if (!status) {
        return res.status(404).json({ message: 'Status not found' });
      }
      await status.destroy();
      res.json({ message: 'Status deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = statusController;
