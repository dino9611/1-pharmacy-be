const express = require('express');
const cartRoutes = express.Router();
const CartController = require('../../controller/cart/Cart');
const { verifyToken } = require('../../middleware/verifyToken');

// @ /cart
cartRoutes.post('/', verifyToken(), CartController.addToCart);
cartRoutes.get('/', verifyToken(), CartController.getCart);
cartRoutes.put('/', verifyToken(), CartController.editCart);

module.exports = cartRoutes;
module.exports = cartRoutes;