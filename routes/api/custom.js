const express = require('express');
const customRoutes = express.Router();
const CustomOrder = require('../../controller/inventory/customOrder');

customRoutes.get('/:page/:limit', CustomOrder.getPrescriptions);
customRoutes.post('/create/order', CustomOrder.createOrder);
customRoutes.post('/', CustomOrder.createPrescription);

module.exports = customRoutes;
