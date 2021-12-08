// const Sequelize = require('sequelize');
// const sequelize = require('../util/database');
// const Orders = sequelize.define('Orders', {
// 	id: {
// 		allowNull: false,
// 		autoIncrement: true,
// 		primaryKey: true,
// 		type: Sequelize.INTEGER,
// 	},
// 	shipping_name: {
// 		type: Sequelize.STRING,
// 	},
// 	shipping_address: {
// 		type: Sequelize.STRING,
// 	},
// 	shipping_phone_number: {
// 		type: Sequelize.STRING,
// 	},
// 	payment_image_proof: {
// 		type: Sequelize.STRING,
// 	},
// 	transaction_number: {
// 		type: Sequelize.STRING,
// 	},
// 	status: {
// 		type: Sequelize.INTEGER,
// 	},
// 	createdAt: {
// 		allowNull: false,
// 		type: Sequelize.DATE,
// 	},
// 	updatedAt: {
// 		allowNull: false,
// 		type: Sequelize.DATE,
// 	},
// });

// module.exports = Orders;

module.exports = (sequelize, DataTypes) => {
	const Orders = sequelize.define('Orders', {
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER,
		},
		shipping_name: {
			type: DataTypes.STRING,
		},
		shipping_address: {
			type: DataTypes.STRING,
		},
		shipping_phone_number: {
			type: DataTypes.STRING,
		},
		payment_image_proof: {
			type: DataTypes.STRING,
		},
		transaction_number: {
			type: DataTypes.STRING,
		},
		status: {
			type: DataTypes.INTEGER,
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
	return Orders;
};
