const express = require('express');
const adminRoutes = express.Router();
const { login, dashboard } = require('../../controller/authController');
const { verifyAdminToken, verifyUserToken } = require("../../middleware");

adminRoutes.post('/login', login);
adminRoutes.get('/dashboard', verifyAdminToken(), dashboard);

module.exports = adminRoutes;