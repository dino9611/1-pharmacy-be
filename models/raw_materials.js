const Sequelize = require('sequelize');
const sequelize = require('../util/database');
const Raw_materials = sequelize.define('Raw_materials', {
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
	bottle_quantity: {
		type: Sequelize.INTEGER,
	},
	quantity_per_bottle: {
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

module.exports = Raw_materials;
