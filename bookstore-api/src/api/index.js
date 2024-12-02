const express = require('express');

const emojis = require('./emojis');
const bookHandler = require("./book-handler");

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏',
  });
});

router.use('/books', bookHandler)

module.exports = router;
