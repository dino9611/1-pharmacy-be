const express = require('express');
const inventoryRoutes = express.Router();
const Material = require('../../controller/inventory/materialInventory');
const Product = require('../../controller/inventory/productInventory');

//@ admin raw material and pharmacy product routes
//! private

//@ Medicines
inventoryRoutes.get('/', Product.getList);
inventoryRoutes.post('/', Product.createProduct, Product.getList);
inventoryRoutes.get('/:id', Product.getProductDetail);
inventoryRoutes.put('/:id', Product.updateInformation);
inventoryRoutes.put('/:id/stock', Product.editStock);
inventoryRoutes.delete('/:id', Product.deleteStock);
//@ Raw materials
inventoryRoutes.get('/material', Material.getList);
inventoryRoutes.post('/material', Material.addMaterial, Material.getList);
inventoryRoutes.put('/material/:id', Material.updateInformation);
inventoryRoutes.put('/material/:id/:q', Material.updateQuantity);
inventoryRoutes.delete('/material/:id', Material.deleteStock);

module.exports = inventoryRoutes;
