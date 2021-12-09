const express = require('express');
const adminRoutes = express.Router();
const { dashboard } = require('../../controller/authentication/authController');
const { salesReport, revenueReport } = require('../../controller/admin/salesController');
const { verifyAdminToken } = require('../../middleware');

adminRoutes.get('/dashboard', verifyAdminToken(), dashboard);
adminRoutes.get('/sales', salesReport);
adminRoutes.get('/revenue', revenueReport);

module.exports = adminRoutes;