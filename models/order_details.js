// const Sequelize = require('sequelize');
// const sequelize = require('../util/database');
// const Order_details = sequelize.define('Order_details', {
// 	id: {
// 		allowNull: false,
// 		autoIncrement: true,
// 		primaryKey: true,
// 		type: Sequelize.INTEGER,
// 	},
// 	quantity: {
// 		type: Sequelize.INTEGER,
// 	},
// 	price: {
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

// module.exports = Order_details;

module.exports = (sequelize, DataTypes) => {
	const Order_details = sequelize.define('Order_details', {
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER,
		},
		quantity: {
			type: DataTypes.INTEGER,
		},
		price: {
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
	return Order_details;
};
