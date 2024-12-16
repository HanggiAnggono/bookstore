const express = require('express');
const router = express.Router();
const Order = require('../models/order');
const { check, validationResult } = require('express-validator');
const { default: axios } = require('axios');

const bookstoreApi = process.env.BOOKSTORE_API_PORT.replace(
  'tcp://',
  'http://',
);

const orderValidator = [
  check('user.value').not().isEmpty().trim().escape(),
  check('book.value').not().isEmpty().trim().escape(),
];

// Error handler middleware
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// Get all orders
router.get(
  '/orders',
  asyncHandler(async function getAllOrders(req, res) {
    const orders = await Order.findAll({
      order: [['createdAt', 'DESC']],
    });
    res.json(orders);
  }),
);

// Get single order
router.get(
  '/orders/:id',
  asyncHandler(async function getOrderById(req, res) {
    const order = await Order.findByPk(req.params.id);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.json(order);
  }),
);

// Create order
router.post(
  '/orders',
  orderValidator,
  asyncHandler(async function createOrder(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { user, book } = req.body;

    const bookResp = await axios.get(`${bookstoreApi}/api/books/${book.value}`);

    const order = await Order.create({
      userId: user.value,
      bookId: book.value,
      total: bookResp.data.data.default_price,
    });
    res.status(201).json(order);
  }),
);

// Update order status
router.patch(
  '/orders/:id/status',
  asyncHandler(async function updateOrderStatus(req, res) {
    const { status } = req.body;
    if (!['pending', 'completed', 'cancelled'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const order = await Order.findByPk(req.params.id);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    order.status = status;
    await order.save();
    res.json(order);
  }),
);

module.exports = router;
