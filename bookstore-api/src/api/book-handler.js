const express = require('express');
const Book = require('../models/book');
const { check, validationResult } = require('express-validator');
const { Op } = require('sequelize');
const Genre = require('../models/genre');

const bookHandler = express.Router();

const bookFormValidator = [
  check('title').not().isEmpty().trim().escape(),
  check('author').not().isEmpty().trim().escape(),
  check('published_date').not().isEmpty().trim().escape(),
  check('genres').isArray(),
  check('genres.*.value').not().isEmpty().trim().escape(),
];

bookHandler.get('/', async (req, res) => {
  const params = req.query;
  const { id } = params || {};

  const books = await Book.findAll(
    id ? { where: { id: { [Op.in]: id } } } : {},
  );

  const data = books.map((b) => {
    return {
      ...b.dataValues,
      title: b.title.replace(new RegExp('&' + '#' + 'x27;', 'g'), "'"),
    };
  });

  res.json({ data });
});

bookHandler.post('/', bookFormValidator, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const book = await Book.create({
    title: req.body.title,
    author: req.body.author,
    published_date: req.body.published_date,
  });

  const genres = await Genre.findAll({
    where: {
      id: {
        [Op.in]: req.body.genres.map((g) => g.value),
      },
    },
  });

  await book.setGenres(genres);

  res.json({
    data: book,
    status: 'success',
  });
});

// get book
bookHandler.get('/:id', async (req, res) => {
  const book = await Book.findByPk(req.params.id);
  res.json({
    data: book,
  });
});

// update book
bookHandler.put('/:id', bookFormValidator, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const payload = {
    title: req.body.title,
    author: req.body.author,
    published_date: req.body.published_date,
  };

  const book = await Book.findByPk(req.params.id);

  const genres = await Genre.findAll({
    where: {
      id: {
        [Op.in]: req.body.genres.map((g) => g.value),
      },
    },
  });

  await book.set(payload);
  await book.setGenres(genres);
  await book.save();

  res.json({
    data: {
      id: req.params.id,
      ...payload,
      genres,
    },
    status: 'success',
  });
});

// delete book
bookHandler.delete('/:id', async (req, res) => {
  await Book.destroy({
    where: {
      id: req.params.id,
    },
  });

  res.json({
    data: {
      id: req.params.id,
    },
    status: 'success',
  });
});

module.exports = bookHandler;
