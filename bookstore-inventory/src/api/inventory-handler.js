const express = require('express');
const Inventory = require('../models/inventory');
const { check, validationResult } = require('express-validator');
const { default: axios } = require('axios');

const inventoryHandler = express.Router();

inventoryHandler.get('/', async function getInventories(req, res) {
  const inventories = await Inventory.findAll({ order: [['id', 'DESC']] });

  const bookIds = inventories.map((i) => i.book_id);

  try {
    const resp = await axios.get(`${process.env.API_GATEWAY_URL}/api/books`, {
      params: { id: bookIds },
    });
    const { data: books } = resp.data || {};

    const data = inventories.map((i) => {
      const book = books.find((b) => b.id === i.book_id);

      return { ...i.dataValues, book };
    });

    res.json({ data });
  } catch (error) {
    res.json({
      error: error.message,
    });
  }
});

// update inventory either add or remove will create a new row
inventoryHandler.post(
  '/',
  [
    check('book_id').not().isEmpty().trim().escape(),
    check('action').not().isEmpty().trim().escape(),
  ],
  async function updateInventory(req, res) {
    const inventory = await Inventory.create(req.body);
    res.json({
      data: inventory,
    });
  },
);

module.exports = inventoryHandler;
