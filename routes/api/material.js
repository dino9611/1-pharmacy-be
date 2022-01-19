const express = require('express');
const materialRoutes = express.Router();
const Material = require('../../controller/inventory/materialInventory');

materialRoutes.get('/search', Material.getSearch);
materialRoutes.get('/:id', Material.getById);
materialRoutes.get('/getList/:page/:limit', Material.getList);
materialRoutes.post('/', Material.addMaterial);
materialRoutes.put('/stock/:id', Material.updateQuantity);
materialRoutes.put('/info/:id', Material.updateInformation);
materialRoutes.delete('/:id', Material.deleteStock);

module.exports = materialRoutes;
