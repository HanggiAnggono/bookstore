const express = require('express');
const Genre = require('../models/genre');
const { check, validationResult } = require('express-validator');
const { Op } = require('sequelize');

const genreHandler = express.Router();

const genreValidator = [check('name').not().isEmpty().trim().escape()];

genreHandler.get('/', async (req, res) => {
  const genres = await Genre.findAll({});

  res.json({
    data: genres,
  });
});

genreHandler.post('/', genreValidator, async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const genre = await Genre.create({
    name: req.body.name,
  });

  res.json({
    data: genre,
    status: 'success',
  });
});

module.exports = genreHandler;
