const express = require('express');
const routes = express.Router();
const inventoryRoutes = require('./api/inventory');
// @import router path

routes.get('/', (req, res) => {
	res.send('home');
});

// @defining router path
//* public

//@ admin use routes for inventory
//! private
routes.use('/inventory', inventoryRoutes);

module.exports = routes;
