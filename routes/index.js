const express = require('express');
const routes = express.Router();
const inventoryRoutes = require('./api/inventory');
const profileRoutes = require('./api/profile');
// @import router path

routes.get('/', (req, res) => {
	res.send('home');
});

// @defining router path
//* public

//@ admin use routes for inventory
//! private
routes.use('/inventory', inventoryRoutes);
routes.use('/profile', profileRoutes);

module.exports = routes;
