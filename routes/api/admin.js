const express = require('express');
const adminRoutes = express.Router();
const { monthlySales, topMedicineOrders, currentOrdersStatus, ordersByGender, ordersByAgeRange, topBuyers } = require('../../controller/reportDatas/salesController');
const { totalRevenue, totalOrders, potentialOrders, monthlyRevenue } = require('../../controller/reportDatas/revenueController');
const { verifyAdminToken } = require('../../middleware');

// jangan lupa pakein middleware kalo udh beres entar
adminRoutes.get('/sales/monthly-sales', monthlySales);
adminRoutes.get('/sales/top-medicine-orders', topMedicineOrders);
adminRoutes.get('/sales/top-buyers', topBuyers);
adminRoutes.get('/sales/current-orders-status', verifyAdminToken(), currentOrdersStatus);
adminRoutes.get('/sales/orders-by-gender', ordersByGender);
adminRoutes.get('/sales/orders-by-age-range', ordersByAgeRange);
// jangan lupa pakein middleware kalo udh beres entar
adminRoutes.get('/revenue/monthly-revenue', monthlyRevenue);
adminRoutes.get('/revenue/total-revenue', totalRevenue);
adminRoutes.get('/revenue/total-orders', totalOrders);
adminRoutes.get('/revenue/potential-orders', potentialOrders);

module.exports = adminRoutes;