const express = require('express');
const router = express.Router();
const Order = require('../models/order');

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
  asyncHandler(async function createOrder(req, res) {
    const order = await Order.create(req.body);
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
