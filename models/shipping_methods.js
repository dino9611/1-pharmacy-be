// const Sequelize = require('sequelize');
// const sequelize = require('../util/database');
// const Shipping_methods = sequelize.define('Shipping_methods', {
// 	id: {
// 		allowNull: false,
// 		autoIncrement: true,
// 		primaryKey: true,
// 		type: Sequelize.INTEGER,
// 	},
// 	name: {
// 		type: Sequelize.STRING,
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

// module.exports = Shipping_methods;

module.exports = (sequelize, DataTypes) => {
	const Shipping_methods = sequelize.define('Shipping_methods', {
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER,
		},
		name: {
			type: DataTypes.STRING,
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
	return Shipping_methods;
};
