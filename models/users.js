// const Sequelize = require('sequelize');
// const sequelize = require('../util/database');
// const Users = sequelize.define('Users', {
// 	id: {
// 		allowNull: false,
// 		autoIncrement: true,
// 		primaryKey: true,
// 		type: Sequelize.INTEGER,
// 	},
// 	firstName: {
// 		type: Sequelize.STRING,
// 	},
// 	lastName: {
// 		type: Sequelize.STRING,
// 	},
// 	gender: {
// 		type: Sequelize.STRING,
// 	},
// 	birthdate: {
// 		type: Sequelize.DATE,
// 	},
// 	address: {
// 		type: Sequelize.STRING,
// 	},
// 	username: {
// 		type: Sequelize.STRING,
// 	},
// 	email: {
// 		type: Sequelize.STRING,
// 	},
// 	password: {
// 		type: Sequelize.STRING,
// 	},
// 	avatar: {
// 		type: Sequelize.STRING,
// 	},
// 	isAdmin: {
// 		type: Sequelize.BOOLEAN,
// 		defaultValue: false,
// 		allowNull: false,
// 	},
// 	isVerified: {
// 		type: Sequelize.BOOLEAN,
// 		defaultValue: false,
// 		allowNull: false,
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

// module.exports = Users;

module.exports = (sequelize, DataTypes) => {
	const Users = sequelize.define('Users', {
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER,
		},
		firstName: {
			type: DataTypes.STRING,
		},
		lastName: {
			type: DataTypes.STRING,
		},
		gender: {
			type: DataTypes.STRING,
		},
		birthdate: {
			type: DataTypes.DATE,
		},
		address: {
			type: DataTypes.STRING,
		},
		username: {
			type: DataTypes.STRING,
		},
		email: {
			type: DataTypes.STRING,
		},
		password: {
			type: DataTypes.STRING,
		},
		avatar: {
			type: DataTypes.STRING,
		},
		isAdmin: {
			type: DataTypes.BOOLEAN,
			defaultValue: false,
			allowNull: false,
		},
		isVerified: {
			type: DataTypes.BOOLEAN,
			defaultValue: false,
			allowNull: false,
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
	return Users;
};
