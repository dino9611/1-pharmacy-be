const express = require('express');
const cartRoutes = express.Router();
const CartController = require('../../controller/cart/Cart');

// @ /cart
cartRoutes.get('/:id', CartController.getCart);
cartRoutes.post('/add/:id', CartController.addProductToCart);
cartRoutes.put('/edit/:id', CartController.editItemInCart);
cartRoutes.delete('/delete/:id', CartController.deleteItemInCart);
module.exports = cartRoutes;
