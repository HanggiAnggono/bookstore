const express = require('express');
const Inventory = require('../models/inventory');
const { check, validationResult } = require('express-validator');

const inventoryHandler = express.Router();

inventoryHandler.get('/', async (req, res) => {
  const inventories = await Inventory.findAll();
  res.json({
    data: inventories,
  });
});

// update inventory either add or remove will create a new row
inventoryHandler.put(
  '/',
  [
    check('book_id').not().isEmpty().trim().escape(),
    check('action').not().isEmpty().trim().escape(),
  ],
  async (req, res) => {
    const inventory = await Inventory.create(req.body);
    res.json({
      data: inventory,
    });
  },
);

module.exports = inventoryHandler;
