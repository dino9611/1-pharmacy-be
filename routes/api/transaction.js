const express = require('express');
const transactionRoutes = express.Router();
const { getUserTransactions } = require('../../controller/reportDatas/transactionController');
const { verifyToken } = require('../../middleware')

transactionRoutes.get('/', verifyToken(), getUserTransactions);

module.exports = transactionRoutes;