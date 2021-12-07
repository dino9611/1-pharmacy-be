const express = require('express');
const inventoryRoutes = express.Router();
const Material = require('../../controller/inventory/materialInventory');
const Product = require('../../controller/inventory/productInventory');

//@admin product
//! private
inventoryRoutes.get('/', Product.getList);
inventoryRoutes.post('/', Product.createProduct);
inventoryRoutes.put('/', Product.updateInformation);
inventoryRoutes.delete('/:id', Product.deleteStock);
inventoryRoutes.post('/stock', Product.editStock);
//@ admin raw material
//! private
inventoryRoutes.get('/material', Material.getList);
inventoryRoutes.post('/material', Material.addMaterial);
inventoryRoutes.put('/material/', Material.updateInformation);
inventoryRoutes.put('/material/:id/:q', Material.updateQuantity);
inventoryRoutes.delete('/material/:id', Material.deleteStock);

module.exports = inventoryRoutes;
