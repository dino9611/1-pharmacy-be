const express = require('express');
const transactionRoutes = express.Router();
const { getUserDatas, getUserDetails, getOrderHistory, getOrderDetails, changeOrderStatus } = require('../../controller/reportDatas/transactionController');
const { verifyAdminToken } = require('../../middleware');

// jangan lupa pakein middleware kalo udh beres entar
transactionRoutes.get('/admin/transactions/userDatas', getUserDatas);
transactionRoutes.get('/admin/transactions/userDatas/user-details', getUserDetails);
transactionRoutes.get('/admin/transactions/userDatas/orderHistory', getOrderHistory);
transactionRoutes.get('/admin/transactions/userDatas/orderHistory/order-details', getOrderDetails);
transactionRoutes.post('/admin/transactions/orderRequest', changeOrderStatus);

module.exports = transactionRoutes;