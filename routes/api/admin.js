const express = require('express');
const adminRoutes = express.Router();
const { login, dashboard } = require('../../controller/authController');
const { salesReport } = require('../../controller/salesController');
const { verifyAdminToken, verifyUserToken } = require("../../middleware");

adminRoutes.post('/login', login);
adminRoutes.get('/dashboard', verifyAdminToken(), dashboard);
adminRoutes.get('/sales', salesReport);

module.exports = adminRoutes;