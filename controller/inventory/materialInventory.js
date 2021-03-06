const db = require('../../models/index');
const { Op } = require('sequelize');
const Raw_materials = db.Raw_materials;
const Medicines = db.Medicines;

class Material {
	static async getList(req, res) {
		let page = +req.params.page;
		let limit = +req.params.limit;
		let offset = limit * (page - 1);
		const list = await Raw_materials.findAll({
			limit: limit,
			offset: offset,
			order: [['name', 'ASC']],
		});
		const allData = await Raw_materials.findAll();
		let pageLimit = allData.length;
		res.json({ list, pageLimit });
	}
	static async getSearch(req, res) {
		try {
			const list = await Raw_materials.findAll({
				where: {
					name: {
						[Op.like]: `${req.query.name}%`,
					}, // => where name like %? wild card sql
				},
				limit: 10,
			});

			res.json(list);
		} catch (error) {
			console.log(error);
			res.status(500).json(error);
		}
	}
	static async getById(req, res) {
		try {
			const data = await Raw_materials.findOne({
				where: {
					id: req.params.id,
				},
			});
			res.json(data);
		} catch (error) {
			console.log(error);
			res.status(500).json(error);
		}
	}
	static async addMaterial(req, res) {
		Raw_materials.create(req.body)
			.then((data) => {
				res.json(data);
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
		const input = req.body;
		let data = await Raw_materials.findOne({ where: { id: req.params.id } });

		if (input.bottle_quantity) {
			input.stock_quantity =
				input.bottle_quantity * data.dataValues.quantity_per_bottle;
		}
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

	static async medicineMaterialList(req, res) {
		try {
			const list = await Raw_materials.findAll({
				include: {
					model: Medicines,
					where: {
						PrescriptionId: {
							[Op.eq]: null,
						},
					},
				},
			});
			res.send(list);
		} catch (error) {
			console.log(error);
			res.send(error);
		}
	}
	static async prescriptionMaterialList(req, res) {
		try {
			const list = await Raw_materials.findAll({
				include: {
					model: Medicines,
					where: {
						PrescriptionId: {
							[Op.ne]: null,
						},
					},
				},
			});
			res.send(list);
		} catch (error) {
			console.log(error);
			res.send(error);
		}
	}
}

module.exports = Material;
