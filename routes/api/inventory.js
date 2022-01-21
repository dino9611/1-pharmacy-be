const express = require('express');
const inventoryRoutes = express.Router();
const Product = require('../../controller/inventory/productInventory');
//@ admin raw material and pharmacy product routes
//! private

//@ Medicines
inventoryRoutes.get('/prescription/material', Product.getPrescriptionMaterial);
inventoryRoutes.get('/:page/:limit', Product.getList);
inventoryRoutes.get('/store/:page/:limit/items', Product.getProductEcomerce);
inventoryRoutes.get('/medicines', Product.getSearch);
inventoryRoutes.get('/medicines/:id', Product.getMedicineDetailInformation);
inventoryRoutes.post('/', Product.createProduct, Product.getList);
inventoryRoutes.get('/:id', Product.getProductDetail);
inventoryRoutes.put('/:id', Product.updateInformation);
inventoryRoutes.put('/medicines/stock/:id', Product.editStock);
inventoryRoutes.delete('/:id', Product.deleteStock);

//@ Raw materials

module.exports = inventoryRoutes;
