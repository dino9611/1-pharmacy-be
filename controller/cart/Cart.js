const { Op } = require('sequelize');
const {
	Cart_details,
	Carts,
	Medicines
} = require('../../models');

class CartController {
	static async addToCart(req, res) {
		const { user } = req;
		const { medicineId, quantity } = req.body;

		try {
			let cart = await Carts.findOne({ where: { userId: user.id, isCheckout: false } });
			let cartDetail;

			if (!cart) {
				cart = await Carts.create({
					isCheckout: false,
					userId: user.id
				});
				cartDetail = await Cart_details.create({
					quantity,
					MedicineId: medicineId,
					CartId: cart.id
				});
			} else {
				cartDetail = await Cart_details.findOne({
					where: {
						MedicineId: medicineId,
						CartId: cart.id,
					}
				});
				if (cartDetail) {
					await Cart_details.update(
						{ 
							quantity: quantity + cartDetail.quantity
						},
						{
							where: {
								CartId: cart.id,
								MedicineId: medicineId,
							} 
						},
					);
				} else {
					cartDetail = await Cart_details.create({
						MedicineId: medicineId,
						quantity,
						CartId: cart.id
					});
				}
			}

			const cartDetails = await Cart_details.findAll({
				where: {
					CartId: cart.id,
					quantity: {
						[Op.gt]: 0
					}
				},
				include: Medicines
			});

			return res.status(200).json({
				...cart.dataValues,
				cartDetails
			});
		} catch (error) {
			console.log(error);
			res.status(500).json({ message: error });
		}
	}

	static async getCart(req, res) {
		const { user } = req;
		try {
			const cart = await Carts.findOne({
				where: { UserId: user.id },
			});
			
			if (!cart) {
				return res.status(404).json({ message: 'No cart' });
			}

			const cartDetails = await Cart_details.findAll({
				where: { CartId: cart.id },
				include: Medicines
			});
	
			return res.status(200).json({
				...cart.dataValues,
				cartDetails
			});
		} catch (error) {
			console.log(error);
			res.status(500).json({ message: 'Internal server error' });
		}
	}

	static async editCart(req, res) {
		const { user } = req;
		const { medicineId, quantity } = req.body;
		try {
			const cart = await Carts.findOne({
				where: { UserId: user.id }
			});
			
			if (!cart) {
				return res.status(404).json({})
			}

			if (quantity < 1) {
				await Cart_details.destroy({
					where: {
						CartId: cart.id,
						MedicineId: medicineId
					}
				});
			} else {
				await Cart_details.update(
					{ quantity },
					{
						where: {
							CartId: cart.id,
							MedicineId: medicineId,
						} 
					},
				);
			}

			const cartDetails = await Cart_details.findAll({
				where: {
					CartId: cart.id
				},
				include: Medicines
			});
			
			return res.status(200).json({
				...cart.dataValues,
				cartDetails
			});

		} catch (error) {
			console.log(error);
			res.status(500).json({ message: 'Internal server error' });
		}
	}
}

module.exports = CartController;