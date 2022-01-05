const { sequelize } = require('../../config');
const db = require('../../models/');

const Medicines = db.Medicines;
const Prescriptions = db.Prescriptions;

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
			const allData = await Medicines.findAll();
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
