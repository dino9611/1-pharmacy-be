const Sequelize = require('sequelize');
const sequelize = require('../util/database');
const Order_details = sequelize.define('Order_details', {
	id: {
		allowNull: false,
		autoIncrement: true,
		primaryKey: true,
		type: Sequelize.INTEGER,
	},
	quantity: {
		type: Sequelize.INTEGER,
	},
	price: {
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

module.exports = Order_details;
