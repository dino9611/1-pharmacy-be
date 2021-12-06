const Sequelize = require('sequelize');
const sequelize = require('../util/database');
const Payment_methods = sequelize.define('Payment_methods', {
	id: {
		allowNull: false,
		autoIncrement: true,
		primaryKey: true,
		type: Sequelize.INTEGER,
	},
	name: {
		type: Sequelize.STRING,
	},
	account_number: {
		type: Sequelize.STRING,
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

module.exports = Payment_methods;
