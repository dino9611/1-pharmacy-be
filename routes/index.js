const express = require('express');
const routes = express.Router();
const inventoryRoutes = require('./api/inventory');
const profileRoutes = require('./api/profile');
const materialRoutes = require('./api/material');
// @import router path

routes.get('/', (req, res) => {
	res.send('home');
});

// @defining router path

//@ admin use routes for inventory
//! private
routes.use('/inventory', inventoryRoutes);
routes.use('/profile', profileRoutes);
routes.use('/material', materialRoutes);

module.exports = routes;
