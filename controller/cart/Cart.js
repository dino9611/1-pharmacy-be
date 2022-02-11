const { Op } = require('sequelize');
const { Cart_details } = require('../../models');
const db = require('../../models');

const Carts = db.Carts;
const Medicines = db.Medicines;

class CartController {
	static async addProductToCart(req, res) {
		try {
			const cart = await Carts.findOne({ where: { id: +req.params.id } });
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
		} catch (error) {
			console.log(error);
			res.status(500).json({ message: error });
		}
		//basic cart add function without auto decrement will await for update
	}
	static async getCart(req, res) {
		const check = await Carts.findOne({
			where: { id: req.params.id },
			include: Medicines,
		});

		res.send(check);
	}

	static async editItemInCart(req, res) {
		let update = await Cart_details.update(
			{ quantity: req.body.quantity },
			{
				where: {
					[Op.and]: [{ CartId: +req.params.id }, { MedicineId: req.body.id }],
				},
			},
		);

		let data = await Cart_details.findOne({
			where: {
				[Op.and]: [{ CartId: +req.params.id }, { MedicineId: req.body.id }],
			},
		});

		res.send(data);
	}
	static async deleteItemInCart(req, res) {
		let destroy = await Cart_details.destroy({
			where: {
				[Op.and]: [{ CartId: +req.params.id }, { MedicineId: req.body.id }],
			},
		});
		const data = await Carts.findOne({
			where: { id: req.params.id },
			include: Medicines,
		});

		res.send(data);
	}

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
