const Sequelize = require('sequelize');
const sequelize = require('../util/database');
const Carts = sequelize.define('Carts', {
	id: {
		allowNull: false,
		autoIncrement: true,
		primaryKey: true,
		type: Sequelize.INTEGER,
	},
	isCheckout: {
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

module.exports = Carts;
