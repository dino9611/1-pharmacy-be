const express = require('express');
const materialRoutes = express.Router();
const Material = require('../../controller/inventory/materialInventory');

materialRoutes.get('/search', Material.getSearch);
materialRoutes.get('/getList/:page/:limit', Material.getList);
materialRoutes.post('/', Material.addMaterial);
materialRoutes.put('/:id', Material.updateInformation);
// materialRoutes.put('/quantity/:id/:q', Material.updateQuantity);
materialRoutes.delete('/:id', Material.deleteStock);

module.exports = materialRoutes;
