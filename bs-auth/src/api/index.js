const express = require('express');

const router = express.Router();

router.use('/auth', require('./auth-handler'));

module.exports = router;
