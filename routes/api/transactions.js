const express = require('express');
const transactionRoutes = express.Router();
const { getUserDatas, getUserDetails, getOrderHistory, getOrderDetails, acceptOrRejectAction, getMaterialList } = require('../../controller/reportDatas/transactionController');
const { verifyAdminToken, verifyToken } = require('../../middleware');

transactionRoutes.get('/admin/transactions/userDatas', verifyAdminToken(), getUserDatas);
transactionRoutes.get('/admin/transactions/userDatas/user-details', verifyAdminToken(), getUserDetails);
transactionRoutes.get('/admin/transactions/userDatas/orderHistory', verifyAdminToken(), getOrderHistory);
transactionRoutes.get('/admin/transactions/userDatas/orderHistory/order-details', verifyAdminToken(), getOrderDetails);
transactionRoutes.get('/orderHistory', verifyToken(), getOrderHistory); // for user !! user order history 
transactionRoutes.get('/orderHistory/order-details', verifyToken(), getOrderDetails);// for user !! user order history 
transactionRoutes.post('/admin/transactions/orderRequest', verifyAdminToken(), acceptOrRejectAction);
transactionRoutes.get('/admin/transactions/material-list', getMaterialList);

module.exports = transactionRoutes;