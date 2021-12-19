const express = require('express');
const adminRoutes = express.Router();
const { dashboard } = require('../../controller/authentication/authController');
const { monthlySales, medicineOrders, currentOrdersStatus, ordersByGender, ordersByAgeRange } = require('../../controller/reportDatas/salesController');
const { revenueReport } = require('../../controller/reportDatas/revenueController');
const { getAllTransactions } = require('../../controller/reportDatas/transactionController');
const { verifyAdminToken } = require('../../middleware');

adminRoutes.get('/dashboard', verifyAdminToken(), dashboard);
// jangan lupa pakein middleware kalo udh beres entar
adminRoutes.get('/sales/monthly-sales', monthlySales);
adminRoutes.get('/sales/medicine-orders', medicineOrders);
adminRoutes.get('/sales/current-orders-status', currentOrdersStatus);
adminRoutes.get('/sales/orders-by-gender', ordersByGender);
adminRoutes.get('/sales/orders-by-age-range', ordersByAgeRange);
//
adminRoutes.get('/revenue', verifyAdminToken(), revenueReport);
adminRoutes.get('/transactions', verifyAdminToken(), getAllTransactions);

module.exports = adminRoutes;