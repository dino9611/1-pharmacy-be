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

class Product {
	static async getList(req, res) {
		const list = await Medicines.findAll();
		res.json(list);
	}
	static async addStock(req, res) {
		res.send('add stock quantity from existing product on the list');
	}
	static async createProduct(req, res) {
		//request format [{medicineInfo, materials:[{}]}]
		let { name, price, description, image, serving, isDeleted, materials } =
			req.body[0];

		try {
			let newMedicine = await Medicines.create({
				name,
				price,
				description,
				image,
				serving,
				isDeleted,
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
		const { name, price, description, image, serving, isDeleted, id } =
			req.body;
		res.send(req.body);
	}
	static async deleteStock(req, res) {
		let { id } = req.body;
		await Medicines.destroy({
			where: {
				id,
			},
		});
		res.send(`${req.body.id} deleted`);
	}
}

module.exports = Product;
