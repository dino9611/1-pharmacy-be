const express = require('express');
const transactionRoutes = express.Router();
const { getUserTransactions } = require('../../controller/reportDatas/transactionController');
const { verifyUserToken } = require('../../middleware')

transactionRoutes.get('/', verifyUserToken(), getUserTransactions);

module.exports = transactionRoutes;