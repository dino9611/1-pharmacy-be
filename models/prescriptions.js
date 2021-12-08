// const Sequelize = require('sequelize');
// const sequelize = require('../util/database');
// const Prescriptions = sequelize.define('Prescriptions', {
// 	id: {
// 		allowNull: false,
// 		autoIncrement: true,
// 		primaryKey: true,
// 		type: Sequelize.INTEGER,
// 	},
// 	image: {
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

// module.exports = Prescriptions;

module.exports = (sequelize, DataTypes) => {
	const Prescriptions = sequelize.define('Prescriptions', {
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER,
		},
		image: {
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
	return Prescriptions;
};
