const db = require('../../models');

const Carts = db.Carts;
const Users = db.Users;
const Medicines = db.Medicines;

class CartController {

	// UPDATE Cart
	static async addProductToCart(req, res) {
		const cart = await Carts.findOne({ where: { id: req.params.id } });
		const item = await Medicines.findOne({ where: { id: req.body.id } });
		cart
			.addMedicines(item, {
				through: {
					quantity: req.body.quantity,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			})
			.then((data) => {
				return Carts.findOne({
					where: { id: req.params.id },
					include: Medicines,
				});
			})
			.then((data) => {
				console.log(data);
				res.json({ data });
			})
			.catch((err) => {
				console.log(err);
				res.json({ message: err });
			});
		//basic cart add function without auto decrement will await for update
	}

	// GET Cart
	static async getCart(req, res) {
		try {
			const cart = await Users.findOne({
				where: { id: req.params.id },
				include: Carts,
			});
			console.log(cart);
			res.send(cart);
		}
		catch (err) {
			console.log(err);
			res.status(500).send("Something went wrong");
		}
	}
}
module.exports = CartController;
