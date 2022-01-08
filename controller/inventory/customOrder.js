const { sequelize } = require('../../config');
const db = require('../../models/');

const Medicines = db.Medicines;
const Prescriptions = db.Prescriptions;
const Raw_materials = db.Raw_materials;

class CustomOrder {
	static async getPrescriptions(req, res) {
		let page = +req.params.page;
		let limit = +req.params.limit;
		let offset = limit * (page - 1);
		try {
			let prescriptionList = await Prescriptions.findAll({
				limit: limit,
				offset: offset,
			});
			const allData = await Prescriptions.findAll();
			let pageLimit = allData.length;
			res.json({ prescriptionList, pageLimit });
		} catch (error) {
			console.log(error);
			res.status(500).send({ error });
		}
	}
	static async createPrescription(req, res) {
		let input = req.body;
		try {
			let newPrescription = await Prescriptions.create({
				...input,
			}); // insert to Medicines table
			res.send(newPrescription);
		} catch (error) {
			res.send(error);
		}
	}
	static async createOrder(req, res) {
		//request format [{medicineInfo, materials:[{}]]
		let input = req.body;
		console.log(req.body);
		try {
			let newMedicine = await Medicines.create({
				...input,
			});
			/**
			 * insert to medicine table with only
			 * prescription id
			 * image
			 * serving
			 * medicine ingredients
			 */

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
}

module.exports = CustomOrder;
