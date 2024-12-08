const express = require('express');

const router = express.Router();

router.use('/books/genres', require('./genre-handler'));
router.use('/books', require('./book-handler'));

module.exports = router;
