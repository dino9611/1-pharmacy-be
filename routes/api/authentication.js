const express = require('express');
const authRoutes = express.Router();
const { login, register, forgotPassword, resetPassword } = require('../../controller/authentication/authController');
const { verifyUserToken } = require('../../middleware');

authRoutes.post('/login', login);
authRoutes.post('/register', register);
authRoutes.post('/forgotPassword', forgotPassword);
authRoutes.post('/resetPassword', verifyUserToken(), resetPassword);

module.exports = authRoutes;