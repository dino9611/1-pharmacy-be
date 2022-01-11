const db = require('../../models/');
const { Op } = require('sequelize');
const Medicines = db.Medicines;
const Raw_materials = db.Raw_materials;

class Product {
	static async getList(req, res) {
		console.log(req.query);
		let sort = req.query.name;
		let min = +req.query.min;
		let max = +req.query.max;
		let page = +req.params.page;
		let limit = +req.params.limit;
		let offset = limit * (page - 1);
		const list = await Medicines.findAll({
			limit: limit,
			offset: offset,
			where: {
				price: {
					[Op.between]: [min, max],
				},
			},
			order: [['name', sort]],
		});
		const allData = await Medicines.findAll();
		let pageLimit = allData.length;
		res.json({ list, pageLimit });
	}

	static async getSearch(req, res) {
		try {
			const list = await Medicines.findAll({
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
			res.status(500).json({ error });
		}
	}
	static async getProductDetail(req, res) {
		try {
			const medicine = await Medicines.findOne({
				where: { id: req.params.id },
				include: Raw_materials,
			});

			res.json(medicine);
		} catch (error) {
			res.status(500).json({ message: error });
		}
	}
	static async editStock(req, res) {
		const { quantityInStock } = req.body;

		//handle calculation on frontend
		let data = await Medicines.update(
			{ quantityInStock },
			{
				where: { id: req.params.id },
			},
		);
		res.json(data);
	}
	static async createProduct(req, res) {
		//request format [{medicineInfo, materials:[{}]]
		let input = req.body;
		console.log(req.body);
		try {
			let newMedicine = await Medicines.create({
				...input,
			}); // insert to Medicines table

			input.materials.forEach(async (element) => {
				let item = await Raw_materials.findAll({
					where: { name: element.name },
				});
				newMedicine
					.addRaw_materials(item, {
						through: {
							quantity: +element.quantity,
							UnitId: +element.UnitId,
							createdAt: new Date(),
							updatedAt: new Date(),
						},
					})
					.then((data) => {
						return Medicines.findOne({
							where: { id: newMedicine.dataValues.id },
							include: Raw_materials,
						}); // fetching newly created data that has been associated with
					})
					.then((data) => {
						console.log(data);
						res.send(data);
					})
					.catch((err) => {
						console.log(err);
					});
			});
		} catch (error) {
			res.send(error);
		}
	}
	static async updateInformation(req, res) {
		const input = req.body;

		try {
			await Medicines.update(
				{
					...input,
				},
				{
					where: { id: req.params.id },
				},
			);
			let data = await Medicines.findOne({ where: { id: req.params.id } });
			res.json(data);
		} catch (error) {
			console.log(error);
		}
	}

	static async getMedicineDetailInformation(req, res) {
		const id = req.params.id;
		try {
			const data = await Medicines.findOne({
				where: { id },
				include: Raw_materials,
			});
			res.send(data);
		} catch (error) {
			console.log(error);
		}
	}
	static async deleteStock(req, res) {
		await Medicines.destroy({
			where: {
				id: req.params.id,
			},
		});
		// this is to destroy medicine
		res.send(`deleted`);
	}
	static async getPrescriptionMaterial(req, res) {
		try {
			const medicine = await Medicines.findAll({
				include: Raw_materials,
				where: {
					PrescriptionId: {
						[Op.ne]: null,
					},
				},
			});
			res.send(medicine);
		} catch (error) {
			console.log(error);
		}
	}
}

module.exports = Product;
