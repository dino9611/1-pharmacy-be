const Sequelize = require('sequelize');
const sequelize = require('../util/database');
const Medicines = sequelize.define('Medicines', {
	id: {
		allowNull: false,
		autoIncrement: true,
		primaryKey: true,
		type: Sequelize.INTEGER,
	},
	name: {
		type: Sequelize.STRING,
	},
	price: {
		type: Sequelize.INTEGER,
	},
	description: {
		type: Sequelize.STRING,
	},
	image: {
		type: Sequelize.STRING,
	},
	quantityInStock: {
		type: Sequelize.INTEGER,
		default: 10,
	},
	serving: {
		type: Sequelize.INTEGER,
	},
	isDeleted: {
		type: Sequelize.BOOLEAN,
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

module.exports = Medicines;
