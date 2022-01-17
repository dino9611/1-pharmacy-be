const express = require('express');
const transactionRoutes = express.Router();
const { getUserDatas, getUserDetails, getOrderHistory, getOrderDetails, changeOrderStatus, getMaterialList } = require('../../controller/reportDatas/transactionController');
const { verifyAdminToken } = require('../../middleware');

transactionRoutes.get('/admin/transactions/userDatas', verifyAdminToken(), getUserDatas);
transactionRoutes.get('/admin/transactions/userDatas/user-details', verifyAdminToken(), getUserDetails);
transactionRoutes.get('/admin/transactions/userDatas/orderHistory', verifyAdminToken(), getOrderHistory);
transactionRoutes.get('/admin/transactions/userDatas/orderHistory/order-details', verifyAdminToken(), getOrderDetails);
transactionRoutes.post('/admin/transactions/orderRequest', verifyAdminToken(), changeOrderStatus);
transactionRoutes.get('/admin/transactions/material-list', getMaterialList);

module.exports = transactionRoutes;