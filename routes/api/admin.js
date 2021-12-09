const express = require('express');
const adminRoutes = express.Router();
const { dashboard } = require('../../controller/authentication/authController');
const { salesReport, revenueReport } = require('../../controller/reportDatas/reportController');
const { getAllTransactions } = require('../../controller/reportDatas/transactionController');
const { verifyAdminToken } = require('../../middleware');

adminRoutes.get('/dashboard', verifyAdminToken(), dashboard);
adminRoutes.get('/sales', verifyAdminToken(), salesReport);
adminRoutes.get('/revenue', verifyAdminToken(), revenueReport);
adminRoutes.get('/transactions', verifyAdminToken(), getAllTransactions);

module.exports = adminRoutes;