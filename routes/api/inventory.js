const express = require('express');
const inventoryRoutes = express.Router();
const Material = require('../../controller/inventory/materialInventory');

//@ CMS routes
//! private

//@ admin raw material and pharmacy product routes
//! private

inventoryRoutes.get('/', async (req, res) => {
	res.send('product created by admin list page');
});
inventoryRoutes.post('/', async (req, res) => {
	res.send('admin create new product');
});

inventoryRoutes.get('/material', Material.getList);
inventoryRoutes.post('/material', Material.addMaterial);
inventoryRoutes.put('/material/:id', Material.updateInformation);
inventoryRoutes.put('/material/:id/:q', Material.updateQuantity);
inventoryRoutes.delete('/material', Material.deleteStock);

module.exports = inventoryRoutes;
