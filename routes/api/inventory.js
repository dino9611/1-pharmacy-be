const express = require('express');
const inventoryRoutes = express.Router();
const Material = require('../../controller/inventory/materialInventory');
const Product = require('../../controller/inventory/productInventory');

//@ admin raw material and pharmacy product routes
//! private

inventoryRoutes.get('/', Product.getList);
inventoryRoutes.get('/:id', Product.getProductDetail);
inventoryRoutes.post('/', Product.createProduct);
inventoryRoutes.put('/:id', Product.updateInformation);
inventoryRoutes.put('/:id/stock', Product.editStock);
inventoryRoutes.delete('/:id', Product.deleteStock);

inventoryRoutes.get('/material', Material.getList);
inventoryRoutes.post('/material', Material.addMaterial);
inventoryRoutes.put('/material/:id', Material.updateInformation);
inventoryRoutes.put('/material/:id/:q', Material.updateQuantity);
inventoryRoutes.delete('/material/:id', Material.deleteStock);

module.exports = inventoryRoutes;
