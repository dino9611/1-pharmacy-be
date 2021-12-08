const express = require('express');
const routes = express.Router();
const inventoryRoutes = require('./api/inventory');
const adminRoutes = require('./api/admin');
const authRoutes= require('./api/authentication');

// @import router path

routes.get('/', (req, res) => {
	res.send('home');
});

// @defining router path

//@ admin use routes for inventory
//! private
routes.use('/inventory', inventoryRoutes);
routes.use('/admin', adminRoutes);
routes.use(authRoutes);


module.exports = routes;
