const Sequelize = require('sequelize');
const sequelize = require('../util/database');
const Prescriptions = sequelize.define('Prescriptions', {
	id: {
		allowNull: false,
		autoIncrement: true,
		primaryKey: true,
		type: Sequelize.INTEGER,
	},
	image: {
		type: Sequelize.STRING,
	},
	status: {
		type: Sequelize.INTEGER,
	},
	createdAt: {
		allowNull: false,
		type: Sequelize.DATE,
	},
	updatedAt: {
		allowNull: false,
		type: Sequelize.DATE,
	},
});

module.exports = Prescriptions;
