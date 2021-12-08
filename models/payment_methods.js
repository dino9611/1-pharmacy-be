// const Sequelize = require('sequelize');
// const sequelize = require('../util/database');
// const Payment_methods = sequelize.define('Payment_methods', {
// id: {
// 	allowNull: false,
// 	autoIncrement: true,
// 	primaryKey: true,
// 	type: Sequelize.INTEGER,
// },
// name: {
// 	type: Sequelize.STRING,
// },
// account_number: {
// 	type: Sequelize.STRING,
// },
// createdAt: {
// 	allowNull: false,
// 	type: Sequelize.DATE,
// },
// updatedAt: {
// 	allowNull: false,
// 	type: Sequelize.DATE,
// },
// });

// module.exports = Payment_methods;

module.exports = (sequelize, DataTypes) => {
	const Payment_methods = sequelize.define('Payment_methods', {
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER,
		},
		name: {
			type: DataTypes.STRING,
		},
		account_number: {
			type: DataTypes.STRING,
		},
		createdAt: {
			allowNull: false,
			type: DataTypes.DATE,
		},
		updatedAt: {
			allowNull: false,
			type: DataTypes.DATE,
		},
	});
	return Payment_methods;
};
