const express = require('express');
const supabase = require('../supabase');

const userHandler = express.Router();

userHandler.get('/', async function getUsers(req, res) {
  const data = await supabase.auth.admin.listUsers();

  if (data.error) {
    return res.status(400).json({ error: data.error });
  }

  res.json({
    data: data.data,
    status: 'success',
  });
});

module.exports = userHandler;
