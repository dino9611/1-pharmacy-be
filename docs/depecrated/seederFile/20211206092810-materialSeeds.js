'use strict';
const fs = require('fs');
const faker = require('faker');
module.exports = {
	up: async (queryInterface, Sequelize) => {
		/**
		 * Add seed commands here.
		 *
		 * Example:
		 * await queryInterface.bulkInsert('People', [{
		 *   name: 'John Doe',
		 *   isBetaMember: false
		 * }], {});
		 */
		let dataInput = fs.readFileSync('./seeders/Raw_materialsSeed.json', 'utf8');
		let data = JSON.parse(dataInput);
		let newData = data.map((element) => {
			element.createdAt = faker.date.past();
			element.updatedAt = new Date();
			return element;
		});
		return queryInterface.bulkInsert('Raw_materials', newData, {});
	},

	down: async (queryInterface, Sequelize) => {
		/**
		 * Add commands to revert seed here.
		 *
		 * Example:
		 * await queryInterface.bulkDelete('People', null, {});
		 */
		return queryInterface.bulkDelete('Raw_materials', null, {});
	},
};
