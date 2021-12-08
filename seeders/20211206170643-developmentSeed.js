'use strict';
const { date } = require('faker');
const faker = require('faker');
const fs = require('fs');

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
		await queryInterface.bulkInsert(
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
		const parser = (path) => {
			let dataInput = fs.readFileSync(path, 'utf8');
			let data = JSON.parse(dataInput);
			let newData = data.map((element) => {
				element.createdAt = faker.date.past();
				element.updatedAt = new Date();
				return element;
			});
			return newData;
		};

		await queryInterface.bulkInsert(
			'Users',
			parser('./seeders/UsersSeeds.json'),
			{},
		);
		await queryInterface.bulkInsert(
			'Medicines',
			parser('./seeders/MedicineSeed.json'),
			{},
		);
		await queryInterface.bulkInsert(
			'Raw_materials',
			parser('./seeders/Raw_materialSeeds.json'),
			{},
		);
		await queryInterface.bulkInsert(
			'Shipping_methods',
			parser('./seeders/ShippingMethodsSeed.json'),
			{},
		);
		await queryInterface.bulkInsert(
			'Payment_methods',
			parser('./seeders/Payment_methodsSeed.json'),
			{},
		);
		await queryInterface.bulkInsert(
			'Orders',
			parser('./seeders/OrderSeeds.json'),
			{},
		);
		return await queryInterface.bulkInsert(
			'Carts',
			parser('./seeders/CartsSeed.json'),
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
