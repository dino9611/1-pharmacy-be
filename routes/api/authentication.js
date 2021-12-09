const express = require('express');
const authRoutes = express.Router();
const { login, register, forgotPassword, resetPassword, verifyAccount } = require('../../controller/authentication/authController');
const { verifyUserToken } = require('../../middleware');

authRoutes.post('/login', login);
authRoutes.post('/register', register);
authRoutes.post('/forgotPassword', forgotPassword);
authRoutes.post('/resetPassword', verifyUserToken(), resetPassword);
authRoutes.post('/verifyAccount', verifyUserToken(), verifyAccount);

module.exports = authRoutes;