const db = require('../../models/index');

const Raw_materials = db.Raw_materials;

class Material {
	static async getList(req, res) {
		const list = await Raw_materials.findAll();
		res.json(list);
	}
	static async addMaterial(req, res, next) {
		Raw_materials.create(req.body)
			.then((data) => {
				next();
			})
			.catch((error) => {
				console.log(error);
			});
	}
	static async updateInformation(req, res) {
		const input = req.body;

		Raw_materials.update(
			{
				...input,
			},
			{ where: { id: req.params.id } },
		)
			.then(() => {
				return Raw_materials.findOne({ where: { id: req.params.id } });
			})
			.then((data) => {
				res.json(data);
			})
			.catch((error) => {
				console.log(error);
				res.status(500).json({ error });
			});
	}
	static async updateQuantity(req, res) {
		res.send(
			'update stock according to quantity not bottle, later for should have feature',
		);
	}
	static async deleteStock(req, res) {
		try {
			await Raw_materials.destroy({
				where: {
					id: req.params.id,
				},
			});
			res.json({ message: 'deleted' });
		} catch (error) {
			res.status(500).json(error);
		}
	}
}

module.exports = Material;
