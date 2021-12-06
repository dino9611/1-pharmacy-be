'use strict';
const { date } = require('faker');
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
		return queryInterface.bulkInsert(
			'Units',
			[
				{
					name: 'gr',
					createdAt: faker.date.past(),
					updatedAt: new Date(),
				},
				{
					name: 'ml',
					createdAt: faker.date.past(),
					updatedAt: new Date(),
				},
				{
					name: 'Kg',
					createdAt: faker.date.past(),
					updatedAt: new Date(),
				},
				{
					name: 'L',
					createdAt: faker.date.past(),
					updatedAt: new Date(),
				},
			],
			{},
		);
	},

	down: async (queryInterface, Sequelize) => {
		/**
		 * Add commands to revert seed here.
		 *
		 * Example:
		 * await queryInterface.bulkDelete('People', null, {});
		 */
		return queryInterface.bulkDelete('Units', null, {});
	},
};
