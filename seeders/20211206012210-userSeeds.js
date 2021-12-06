'use strict';
const fs = require('fs');
const faker = require('faker');

module.exports = {
	up: (queryInterface, Sequelize) => {
		/**
		 * Add seed commands here.
		 *
		 * Example:
		 * await queryInterface.bulkInsert('People', [{
		 *   name: 'John Doe',
		 *   isBetaMember: false
		 * }], {});
		 */
		let dataInput = fs.readFileSync('./seeders/userSeed.json', 'utf8');
		let data = JSON.parse(dataInput);
		let newData = data.map((element) => {
			element.birthdate = new Date();
			element.isVerified = 0 ? false : true;
			element.createdAt = faker.date.past();
			element.updatedAt = new Date();
			return element;
		});
		return queryInterface.bulkInsert('Users', newData, {});
	},

	down: (queryInterface, Sequelize) => {
		/**
		 * Add commands to revert seed here.
		 *
		 * Example:
		 * await queryInterface.bulkDelete('People', null, {});
		 */
		return queryInterface.bulkDelete('Users', null, {});
	},
};
