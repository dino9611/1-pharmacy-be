const db = require('../../models/index');

const Users = db.Users;

class Profile {
	static async getProfile(req, res) {
		let data = await Users.findOne({ where: { id: req.params.id } });
		res.json(data.dataValues);
	}

	static async editProfile(req, res) {
		try {
			let input = req.body;
			console.log(input);
			console.log(req.params);
			let update = await Users.update(
				{ ...input },
				{ where: { id: req.params.id } },
			);
			console.log(update);
			let data = await Users.findOne({ where: { id: req.params.id } });
			console.log(data);
			res.json({ data });
		} catch (error) {
			console.log(error);
			res.status(500).json({ error });
		}
	}
	static async pictureHandler(req, res) {
		res.send(`profile user id:${req.params.id}`);
	}
}

module.exports = Profile;
