const express = require('express');
const inventoryHandler = require('./inventory-handler');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'bookstore inventory API',
  });
});

router.use('/inventory', inventoryHandler);

module.exports = router;
