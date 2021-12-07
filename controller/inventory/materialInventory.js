class Material {
	static async getList(req, res) {
		res.send('product created by admin list page');
	}
	static async addMaterial(req, res) {
		res.send('add material to list');
	}
	static async updateInformation(req, res) {
		res.send('update material information');
	}
	static async updateQuantity(req, res) {
		res.send('change quantity');
	}
	static async deleteStock(req, res) {
		res.send('delete entire stock');
	}
}

module.exports = Material;
