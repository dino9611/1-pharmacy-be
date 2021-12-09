const express = require('express');
const adminRoutes = express.Router();
const { dashboard } = require('../../controller/authentication/authController');
const { salesReport, revenueReport } = require('../../controller/reportDatas/reportController');
const { allTransactions } = require('../../controller/reportDatas/userTransactionController');
const { verifyAdminToken } = require('../../middleware');

adminRoutes.get('/dashboard', verifyAdminToken(), dashboard);
adminRoutes.get('/sales', salesReport);
adminRoutes.get('/revenue', revenueReport);
adminRoutes.get('/allTransactions', allTransactions);

module.exports = adminRoutes;