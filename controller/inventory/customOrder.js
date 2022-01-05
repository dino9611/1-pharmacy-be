const db = require('../../models/');

const Medicines = db.Medicines;
const Medicine_ingredients = db.Medicine_ingredients;
const Raw_materials = db.Raw_materials;
const Units = db.Units;

class CustomOrder {
	static async getPrescriptionList(req, res) {
		const list = await Medicines.findAll();
		res.json(list);
	}
	static async editStock(req, res) {
		const { id, quantityInStock } = req.body;

		//handle calculation on frontend
		let data = await Medicines.update(
			{ quantityInStock },
			{
				where: { id },
			},
		);
		res.send(data);
	}
	static async createPrescription(req, res) {
		//request format [{medicineInfo, materials:[{},{}]
		let input = req.body;

		let image, PrescriptionId;

		try {
			let newMedicine = await Medicines.create({
				...input,
			}); // insert to Medicines table

			let materialList = materials.map((element) => {
				element.MedicineId = newMedicine.dataValues.id;
				return element;
			}); // inserting newly create medicine id to existing object of raw material ussage

			Medicine_ingredients.bulkCreate(materialList)
				.then((data) => {
					return Medicine_ingredients.findAll();
				})
				.then((data) => {
					res.send(data);
				})
				.catch((err) => {
					res.send(err);
				}); // inserting to Medicine_ingredients
		} catch (error) {
			res.send(error);
		}
	}
	static async updatePrescriptionInformation(req, res) {
		const input = req.body;

		await Medicines.update(
			{ ...input },
			{
				where: { id },
			},
		);
		res.send('updated'); //get all data later
	}
	static async deletePrescription(req, res) {
		let { id } = req.params;
		await Medicines.destroy({
			where: {
				id,
			},
		});
		// this is to destroy medicine
		res.send(`deleted`);
	}
}

module.exports = CustomOrder;
