const Raw_materials = require('../../models/raw_materials');

class Material {
	static async getList(req, res) {
		const list = await Raw_materials.findAll();
		res.json({ list });
	}
	static async addMaterial(req, res) {
		await Raw_materials.create(req.body);
		res.send('added');
	}
	static async updateInformation(req, res) {
		const { name, price, bottle_quantity, quantity_per_bottle, UnitId, id } =
			req.body;

		Raw_materials.update(
			{
				name: name,
				price: price,
				bottle_quantity: bottle_quantity,
				quantity_per_bottle: quantity_per_bottle,
				UnitId,
			},
			{ where: { id: id } },
		)
			.then((response) => {
				res.json(`${id}, updated`);
			})
			.catch((error) => {
				res.status(500).json({ error });
			});
	}
	static async updateQuantity(req, res) {
		res.send('update stock according to quantity not bottle');
	}
	static async deleteStock(req, res) {
		let { id } = req.body;
		await Raw_materials.destroy({
			where: {
				id,
			},
		});
		res.send(`${req.body.id} deleted`);
	}
}

module.exports = Material;
