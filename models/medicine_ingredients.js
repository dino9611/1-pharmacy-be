// const Sequelize = require('sequelize');
// const sequelize = require('../util/database');
// const Medicine_ingredients = sequelize.define('Medicine_ingredients', {
// 	quantity: {
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

// module.exports = Medicine_ingredients;

module.exports = (sequelize, DataTypes) => {
	const Medicine_ingredients = sequelize.define('Medicine_ingredients', {
		quantity: {
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
	return Medicine_ingredients;
};
