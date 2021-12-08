const db = require('../../models/index');

const Users = db.Users;

class Profile {
	static async getProfile(req, res) {
		let data = await Users.findOne({ where: { id: req.params.id } });
		console.log(data);
		res.json(data.dataValues);
	}
	static async editProfile(req, res) {
		let input = req.body;
		let data = Users.update({ ...input }, { where: { id: req.params.id } });

		res.send(`update profile user id:${req.params.id}`);
	}
	static async pictureHandler(req, res) {
		res.send(`profile user id:${req.params.id}`);
	}
	// ! just for testing
	static async register(req, res) {
		let { email, username, password } = req.body;
		console.log(email, username, password);
		Users.create({ email, username, password });
		res.send('created');
	}
}

module.exports = Profile;
