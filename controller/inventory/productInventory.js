const db = require('../../models/');

const Medicines = db.Medicines;
const Medicine_ingredients = db.Medicine_ingredients;
const Raw_materials = db.Raw_materials;
const Units = db.Units;

class Product {
	static async getList(req, res) {
		const list = await Medicines.findAll();
		res.json(list);
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
		res.send('edited');
	}
	static async createProduct(req, res) {
		//request format [{medicineInfo, materials:[{}]}]
		let {
			name,
			price,
			description,
			image,
			serving,
			isDeleted,
			materials,
			quantityInStock, // => handle in front end
		} = req.body;

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
	static async updateInformation(req, res) {
		const {
			name,
			price,
			description,
			image,
			serving,
			isDeleted,
			quantityInStock,
		} = req.body;

		try {
			await Medicines.update(
				{
					name,
					price,
					description,
					image,
					serving,
					isDeleted,
					quantityInStock,
				},
				{
					where: { id: req.params.id },
				},
			);
		} catch (error) {
			console.log(error);
		}
		res.send('updated'); //get all data later
	}
	static async deleteStock(req, res) {
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

module.exports = Product;
