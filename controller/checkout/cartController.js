// const db = require('../../models');
// const Carts = db.Carts;
// const Cart_details = db.Cart_details
// const User = db.Users
// const Medicines = db.Medicines

// class Cart {

//     static async getCartItems(req, res) {
//         try {
//             let cart = await Carts.findOne({
//                 where: { id: req.params.cart },
//                 include: {
//                     model: User,
//                     where: { id: req.params.id }
//                 },
//                 include: {
//                     model: Cart_details,
//                 },
//             })
//             // console.log(req.params.cart);
//             // console.log(req.params.id);
//             if (cart.UserId && cart.Medicines.length > 0) {
//                 console.log(cart.toJSON());
//                 res.send(cart);
//             }
//             else {
//                 res.send(null);
//             }
//         }
//         catch (err) {
//             console.log(err);
//             res.status(500).send("Something went wrong");
//         }
//     }

//     static async editCartItems(req, res) {
//         try {
//             let cart = await Cart_details.findOne({
//                 include: {
//                     model: Carts,
//                     where: { id: req.params.cart }
//                 },
//                 include: {
//                     model: Medicines,
//                     where: { id: req.body.id }
//                 }
//             });
//             // console.log(cart.Medicines);
//             const price = Medicines.price;
//             const name = Medicines.name;
//             const medicine = {
//                 quantity: req.body.quantity,
//                 name: req.body.name
//             }
//             console.log(medicine)
//             let medicines = await Medicines.findOne({});
//             if (!medicines) {
//                 res.status(404).send('Item not found!')
//             }

//             if (cart) {
//                 // if cart exists for the user
//                 let medicinesIndex = cart.Medicines.findIndex(p => p.id == id);

//                 // Check if product exists or nots
//                 if (medicinesIndex > -1) {
//                     let cartMedicines = cart.Medicines[medicinesIndex];
//                     cartMedicines.quantity += quantity;
//                     cart.Medicines[medicinesIndex] = cartMedicines;
//                 }
//                 else {
//                     cart.Medicines.push({ id, name, quantity, price });
//                 }
//                 // cart.bill += quantity * price;
//                 cart = await cart.save();
//                 return res.status(201).send(cart);
//             }
//             else {
//                 // no cart exists, create one
//                 const newCart = await Carts.create({
//                     id,
//                     include: {
//                         model: Medicines,
//                     }
//                 });
//                 return res.status(201).send(newCart);
//             }
//         }
//         catch (err) {
//             console.log(err);
//             res.status(500).send("Something went wrong");
//         }
//     }
// }

// module.exports = Cart