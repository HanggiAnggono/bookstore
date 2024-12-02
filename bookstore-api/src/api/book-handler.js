const express = require('express')
const Book = require('../models/book')
const { check, validationResult } = require('express-validator')

const bookHandler = express.Router()

const bookFormValidator = [
  check('title').not().isEmpty().trim().escape(),
  check('author').not().isEmpty().trim().escape(),
  check('published_date').not().isEmpty().trim().escape(),
]

bookHandler.get('/', async (req, res) => {
  const books = await Book.findAll()
  res.json({
    data: books,
  })
})

bookHandler.post('/', bookFormValidator, async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const book = await Book.create({
    title: req.body.title,
    author: req.body.author,
    published_date: req.body.published_date,
  })

  res.json({
    data: book,
    status: 'success',
  })
})

// get book
bookHandler.get('/:id', async (req, res) => {
  const book = await Book.findByPk(req.params.id)
  res.json({
    data: book,
  })
})

// update book
bookHandler.put('/:id', bookFormValidator, async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const payload = {
    title: req.body.title,
    author: req.body.author,
    published_date: req.body.published_date,
  }

  await Book.update(payload, {
    where: {
      id: req.params.id,
    },
  })

  res.json({
    data: {
      id: req.params.id,
      ...payload,
    },
    status: 'success',
  })
})

// delete book
bookHandler.delete('/:id', async (req, res) => {
  await Book.destroy({
    where: {
      id: req.params.id,
    },
  })

  res.json({
    data: {
      id: req.params.id,
    },
    status: 'success',
  })
})

module.exports = bookHandler
