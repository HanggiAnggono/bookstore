const express = require('express');
const Book = require('../models/book');
const { check, validationResult } = require('express-validator');
const { Op } = require('sequelize');
const Genre = require('../models/genre');
const Author = require('../models/author');

const bookHandler = express.Router();

const bookFormValidator = [
  check('title').not().isEmpty().trim().escape(),
  check('default_price').not().isEmpty().trim().escape(),
  check('published_date').not().isEmpty().trim().escape(),
  check('author').default({}),
  check('genres').default([]),
  check('genres.*.value').not().isEmpty().trim().escape(),
];

const include = [
  {
    model: Genre,
    attributes: ['id', 'name'],
    through: { attributes: [] },
    required: false,
  },
  {
    model: Author,
    attributes: ['id', 'name'],
    required: false,
  },
];

bookHandler.get('/', async function getBooks(req, res) {
  const params = req.query;
  const { id } = params || {};

  const books = await Book.findAll({
    ...(id ? { where: { id: { [Op.in]: id } } } : {}),
    include,
  });

  const data = books.map((b) => {
    return {
      ...b.dataValues,
      title: b.title.replace(new RegExp('&' + '#' + 'x27;', 'g'), "'"),
    };
  });

  res.json({ data });
});

bookHandler.post('/', bookFormValidator, async function createBook(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const book = await Book.create({
    ...req.body,
    authorId: req.body.author.value,
    genres: req.body.genres.map((g) => g.value),
  });

  await book.setGenres(
    await Genre.findAll({
      where: {
        id: {
          [Op.in]: req.body.genres.map((g) => g.value),
        },
      },
    }),
  );

  res.json({
    data: book,
    status: 'success',
  });
});

// get book
bookHandler.get('/:id', async function getBook(req, res) {
  const book = await Book.findByPk(req.params.id, {
    include: include,
  });

  res.json({
    data: book,
  });
});

// update book
bookHandler.put('/:id', bookFormValidator, async function updateBook(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { genres, author, ...body } = req.body;

  const payload = {
    ...body,
    authorId: author.value,
    published_date: req.body.published_date,
  };

  const book = await Book.findByPk(req.params.id);
  await book.set(payload);
  await book.setGenres(
    await Genre.findAll({
      where: {
        id: {
          [Op.in]: genres.map((g) => g.value),
        },
      },
    }),
  );
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
bookHandler.delete('/:id', async function deleteBook(req, res) {
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
