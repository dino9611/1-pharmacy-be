const express = require('express');
const inventoryRoutes = express.Router();
const Material = require('../../controller/inventory/materialInventory');
const Product = require('../../controller/inventory/productInventory');

//@ admin raw material and pharmacy product routes
//! private

//@ Medicines
inventoryRoutes.get('/medicines', Product.getSearch);
inventoryRoutes.get('/:page/:limit', Product.getList);
inventoryRoutes.post('/', Product.createProduct, Product.getList);
inventoryRoutes.get('/:id', Product.getProductDetail);
inventoryRoutes.put('/:id', Product.updateInformation);
inventoryRoutes.put('/stock/:id', Product.editStock);
inventoryRoutes.delete('/:id', Product.deleteStock);

//@ Raw materials

module.exports = inventoryRoutes;
