const Medicines = require('../../models/medicines');
const Medicine_ingredients = require('../../models/medicine_ingredients');

class Product {
	static async getList(req, res) {
		const list = await Medicines.findAll();
		res.json(list);
	}
	static async addStock(req, res) {
		res.send('added to stock');
	}
	static async updateInformation(req, res) {
		const { name, price, description, image, serving, isDeleted, id } =
			req.body;
		res.send(req.body);
	}
	static async deleteStock(req, res) {
		let { id } = req.body;
		await Medicines.destroy({
			where: {
				id,
			},
		});
		res.send(`${req.body.id} deleted`);
	}
}

module.exports = Product;
