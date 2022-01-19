const express = require('express');
const cartRoutes = express.Router();
const CartController = require('../../controller/cart/Cart');

// @ /cart
cartRoutes.get('/:id', CartController.getCart);
cartRoutes.post('/:id', CartController.addProductToCart);
module.exports = cartRoutes;
