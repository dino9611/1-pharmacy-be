const express = require('express');
const adminRoutes = express.Router();
const { dashboard } = require('../../controller/authentication/authController');
const { salesReport } = require('../../controller/admin/salesController');
const { verifyAdminToken } = require('../../middleware');

adminRoutes.get('/dashboard', verifyAdminToken(), dashboard);
adminRoutes.get('/sales', salesReport);

module.exports = adminRoutes;