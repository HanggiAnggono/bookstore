const express = require('express');

const router = express.Router();

router.use('/auth', require('./auth-handler'));
router.use('/users', require('./user-handler'));

module.exports = router;
