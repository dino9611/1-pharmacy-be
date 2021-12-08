const Medicines = require('../../models/medicines');
const Medicine_ingredients = require('../../models/medicine_ingredients');
const Raw_materials = require('../../models/raw_materials');
const Units = require('../../models/units');

//define relationship if has one sequelize doesn't know the inner working of the table
Raw_materials.belongsToMany(Medicines, {
	through: Medicine_ingredients,
});
Medicines.belongsToMany(Raw_materials, {
	through: Medicine_ingredients,
});
Units.hasMany(Medicine_ingredients);
Medicines.hasMany(Prescriptions);

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
		let {
			name,
			price,
			description,
			serving,
			isDeleted,
			materials,
			quantityInStock,
		} = req.body;

		let image, PrescriptionId;

		try {
			let newMedicine = await Medicines.create({
				name,
				price,
				description,
				image,
				serving,
				isDeleted,
				quantityInStock,
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
		const {
			name,
			price,
			description,
			image,
			serving,
			isDeleted,
			id,
			quantityInStock,
		} = req.body;

		await Medicines.update(
			{ name, price, description, image, serving, isDeleted, quantityInStock },
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
