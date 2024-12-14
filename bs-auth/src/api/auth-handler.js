const express = require('express');
const { check, validationResult } = require('express-validator');
const supabase = require('../supabase');

const authHandler = express.Router();

const authValidator = [
  check('email').not().isEmpty().trim().escape(),
  check('password').not().isEmpty().trim().escape(),
];

authHandler.get('/session', async function getSession(req, res) {
  const session = await supabase.auth.getSession();

  res.json({
    data: session.data,
    error: session.error,
  });
});

authHandler.post('/login', authValidator, async function login(req, res) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const resp = await supabase.auth.signInWithPassword({
    email: req.body.email,
    password: req.body.password,
  });

  if (resp.error) {
    return res.status(400).json({
      data: resp.error,
      status: 'error',
    });
  }

  res.json({
    data: resp.data,
    status: 'success',
  });
});

authHandler.delete('/logout', async function logout(req, res) {
  const resp = await supabase.auth.signOut();

  res.json({
    data: resp.data,
    status: 'success',
  });
});

module.exports = authHandler;
