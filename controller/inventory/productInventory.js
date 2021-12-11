const db = require('../../models/');

const Medicines = db.Medicines;
const Raw_materials = db.Raw_materials;
const Medicine_ingredients = db.Medicine_ingredients;

class Product {
	static async getList(req, res) {
		const list = await Medicines.findAll();
		res.json(list);
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

		try {
			let newMedicine = await Medicines.create({
				...input,
			}); // insert to Medicines table

			input.materials.forEach(async (element) => {
				let item = await Raw_materials.findAll({
					where: { id: element.RawMaterialId },
				});
				newMedicine
					.addRaw_materials(item, {
						through: {
							quantity: element.quantity,
							UnitId: element.UnitId,
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
						res.json(data);
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
	static async deleteStock(req, res) {
		await Medicines.destroy({
			where: {
				id: req.params.id,
			},
		});
		// this is to destroy medicine
		res.send(`deleted`);
	}
}

module.exports = Product;
