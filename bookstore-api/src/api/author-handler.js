const express = require('express');
const { check, validationResult } = require('express-validator');
const Author = require('../models/author');

const authorHandler = express.Router();

const authorValidator = [check('name').not().isEmpty().trim().escape()];

authorHandler.get('/', async function getAuthors(req, res) {
  const authors = await Author.findAll();

  res.json({
    data: authors,
  });
});

authorHandler.post('/', authorValidator, async function createAuthor(req, res) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const author = await Author.create({
    name: req.body.name,
  });

  res.json({
    data: author,
    status: 'success',
  });
});

authorHandler.get('/:id', async function getAuthor(req, res) {
  const author = await Author.findByPk(req.params.id);

  res.json({
    data: author,
  });
});

authorHandler.put(
  '/:id',
  authorValidator,
  async function updateAuthor(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const author = await Author.findByPk(req.params.id);

    await author.update({
      name: req.body.name,
    });

    res.json({
      data: author,
      status: 'success',
    });
  },
);

authorHandler.delete('/:id', async function deleteAuthor(req, res) {
  await Author.destroy({
    where: {
      id: req.params.id,
    },
  });

  res.json({
    data: { id: req.params.id },
    status: 'success',
  });
});

module.exports = authorHandler;
