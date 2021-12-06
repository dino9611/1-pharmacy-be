const Sequelize = require('sequelize');
const sequelize = require('../util/database');
const Orders = sequelize.define('Orders', {
	id: {
		allowNull: false,
		autoIncrement: true,
		primaryKey: true,
		type: Sequelize.INTEGER,
	},
	shipping_name: {
		type: Sequelize.STRING,
	},
	shipping_address: {
		type: Sequelize.STRING,
	},
	shipping_phone_number: {
		type: Sequelize.STRING,
	},
	payment_image_proof: {
		type: Sequelize.STRING,
	},
	transaction_number: {
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

module.exports = Orders;
