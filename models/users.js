const Sequelize = require('sequelize');
const sequelize = require('../util/database');
const Users = sequelize.define('Users', {
	id: {
		allowNull: false,
		autoIncrement: true,
		primaryKey: true,
		type: Sequelize.INTEGER,
	},
	firstName: {
		type: Sequelize.STRING,
	},
	lastName: {
		type: Sequelize.STRING,
	},
	gender: {
		type: Sequelize.STRING,
	},
	birthdate: {
		type: Sequelize.DATE,
	},
	address: {
		type: Sequelize.STRING,
	},
	username: {
		type: Sequelize.STRING,
	},
	email: {
		type: Sequelize.STRING,
	},
	password: {
		type: Sequelize.STRING,
	},
	avatar: {
		type: Sequelize.STRING,
	},
	isAdmin: {
		type: Sequelize.BOOLEAN,
	},
	isVerified: {
		type: Sequelize.BOOLEAN,
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

module.exports = Users;
