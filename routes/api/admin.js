const express = require('express');
const adminRoutes = express.Router();
const { monthlySales, topMedicineOrders, currentOrdersStatus, ordersByGender, ordersByAgeRange, topBuyers } = require('../../controller/reportDatas/salesController');
const { totalRevenue, totalOrders, potentialOrders, monthlyRevenue } = require('../../controller/reportDatas/revenueController');
const { verifyAdminToken } = require('../../middleware');

adminRoutes.get('/sales/monthly-sales', verifyAdminToken(), monthlySales);
adminRoutes.get('/sales/top-medicine-orders', verifyAdminToken(), topMedicineOrders);
adminRoutes.get('/top-medicine-orders', topMedicineOrders);
adminRoutes.get('/sales/top-buyers', verifyAdminToken(), topBuyers);
adminRoutes.get('/sales/current-orders-status', verifyAdminToken(), currentOrdersStatus);
adminRoutes.get('/sales/orders-by-gender', verifyAdminToken(), ordersByGender);
adminRoutes.get('/sales/orders-by-age-range', verifyAdminToken(), ordersByAgeRange);
adminRoutes.get('/revenue/monthly-revenue', verifyAdminToken(), monthlyRevenue);
adminRoutes.get('/revenue/total-revenue', verifyAdminToken(), totalRevenue);
adminRoutes.get('/revenue/total-orders', verifyAdminToken(), totalOrders);
adminRoutes.get('/revenue/potential-orders', verifyAdminToken(), potentialOrders);

module.exports = adminRoutes;