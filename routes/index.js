const express = require('express');
const routes = express.Router();
const inventoryRoutes = require('./api/inventory');
const adminRoutes = require('./api/admin');

// @import router path

routes.get('/', (req, res) => {
	res.send('home');
});

// @defining router path

//@ admin use routes for inventory
//! private
routes.use('/inventory', inventoryRoutes);
routes.use('/admin', adminRoutes);


module.exports = routes;
