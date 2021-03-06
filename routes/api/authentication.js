const express = require('express');
const authRoutes = express.Router();
const {
	login,
	register,
	forgotPassword,
	resetPassword,
	verifyAccount,
	userSendMessage,
} = require('../../controller/authentication/authController');
const { verifyToken } = require('../../middleware');

authRoutes.post('/login', login);
authRoutes.post('/register', register);
authRoutes.post('/forgotPassword', forgotPassword);
authRoutes.post('/resetPassword', verifyToken(), resetPassword);
authRoutes.post('/verifyAccount', verifyToken(), verifyAccount);
authRoutes.post('/userSendMessage', userSendMessage);

module.exports = authRoutes;
