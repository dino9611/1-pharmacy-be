const express = require('express');
const authRoutes = express.Router();
const { login, register } = require('../../controller/authentication/authController');

authRoutes.post('/login', login);
authRoutes.post('/register', register);

module.exports = authRoutes;