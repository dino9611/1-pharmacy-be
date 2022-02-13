const db = require('../../models/');
const { Op } = require('sequelize');
const Medicines = db.Medicines;
const Raw_materials = db.Raw_materials;

class Product {
	static async getProductEcomerce(req, res) {
		try {
			let sort = req.query.name;
			let sortPrice = req.query.price;
			let min = +req.query.min;
			let max = +req.query.max;
			let page = +req.params.page;
			let limit = +req.params.limit;
			let offset = limit * (page - 1);
			const { count, rows } = await Medicines.findAndCountAll({
				limit: limit,
				offset: offset,
				where: {
					price: {
						[Op.between]: [min, max],
					},
					PrescriptionId: {
						[Op.eq]: null,
					},
				},
				order: [
					['price', sortPrice],
					['name', sort],
				],
			});

            const seen = new Set();

			const newDatas = rows.filter(item => {
                const duplicate = seen.has(item.name);
                seen.add(item.name);
                return !duplicate;
            })

			console.log(newDatas)

			res.json({ list: newDatas, itemCount: count });
		} catch (error) {
			console.log(error);
			res.json({ message: error });
		}
	}

	static async getList(req, res) {
		let page = +req.params.page;
		let limit = +req.params.limit;
		let offset = limit * (page - 1);
		const list = await Medicines.findAll({
			where: {
				PrescriptionId: {
					[Op.eq]: null,
				},
			},
			limit: limit,
			offset: offset,
			order: [['name', 'ASC']],
			include: Raw_materials,
		});

		let data = await Medicines.findAll({
			where: {
				PrescriptionId: {
					[Op.eq]: null,
				},
			},
		});

		let pageLimit = data.length;
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

	static async editStock(req, res) {
		const { quantityInStock } = req.body;
		const medicine = await Medicines.findOne({
			where: { id: req.params.id },
			include: Raw_materials,
		});
		const stockDifference = quantityInStock - medicine.quantityInStock;
		let message = 'checking data';
		let rejectMaterial = [];

		if (stockDifference > 0) {
			medicine.Raw_materials.forEach((element) => {
				if (
					element.stock_quantity -
						element.Medicine_ingredients.quantity * stockDifference >=
					0
				) {
					message = 'material checked';
				} else {
					rejectMaterial.push(element.name);
					console.log(rejectMaterial);
					message = 'material unavailable';
				}
			});

			if (rejectMaterial.length === 0) {
				medicine.Raw_materials.forEach(async (element) => {
					let newQuantity =
						element.stock_quantity -
						element.Medicine_ingredients.quantity * stockDifference;

					await Raw_materials.update(
						{
							stock_quantity: newQuantity,
							bottle_quantity: Math.ceil(
								element.stock_quantity / element.quantity_per_bottle,
							),
						},
						{ where: { id: element.id } },
					);

					let data = await Raw_materials.findOne({ where: { id: element.id } });

					console.log(data);
				});

				await Medicines.update(
					{ quantityInStock },
					{ where: { id: req.params.id } },
				);

				const data = await Medicines.findOne({ where: { id: req.params.id } });
				message = 'quantity updated';
				res.json({ message, data });
			} else {
				res.json({ message, rejectMaterial });
			}
		} else {
			await Medicines.update(
				{ quantityInStock },
				{
					where: { id: req.params.id },
				},
			);
			message = 'quantity less than initial value imidiate update';
			const data = await Medicines.findOne({ where: { id: req.params.id } });
			res.json({ message, data });
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
		let data = await Medicines.destroy({
			where: {
				id: req.params.id,
			},
		});

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
			console.log(medicine);
			res.send(medicine);
		} catch (error) {
			console.log(error);
		}
	}
}

module.exports = Product;
