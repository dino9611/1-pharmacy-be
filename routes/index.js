const express = require('express');
const routes = express.Router();
const inventoryRoutes = require('./api/inventory');
const adminRoutes = require('./api/admin');
const authRoutes= require('./api/authentication');
const profileRoutes = require('./api/profile');
const transactionRoutes = require('./api/transaction')
// @import router path

routes.get('/', (req, res) => {
	res.send('home');
});

// @defining router path
//* public

//@ admin use routes for inventory
//! private
routes.use('/inventory', inventoryRoutes);
routes.use('/admin', adminRoutes);
routes.use(authRoutes);
routes.use('/profile', profileRoutes);
routes.use('/transactions', transactionRoutes);


module.exports = routes;
