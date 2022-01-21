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
		const manyToManyInserter = (path, tableName) => {
			const data = parser(path);
			data.forEach(async item => {
				try {
					await queryInterface.bulkInsert(
						tableName,
						[item],
						{}
					)
				} catch (error) {
					console.log(error.original.message);
				}
			});
		}

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
			parser('./seeders/OrderSeeds.json').map(order => ({
				...order,
				UserId: faker.datatype.number({
					min: 6,
					max: 200
				})
			})),
			{},
		);

		manyToManyInserter(
			'./seeders/Medicine_ingredientsSeed.json',
			'Medicine_ingredients'
		);

		manyToManyInserter(
			'./seeders/PrescriptionsSeed.json',
			'Prescriptions'
		);

		manyToManyInserter(
			'./seeders/Order_detailsSeeds.json',
			'Order_details'
		)

		await queryInterface.bulkInsert(
			'Carts',
			parser('./seeders/CartsSeed.json'),
			{},
		);

		await queryInterface.bulkInsert(
			'Cart_details',
			parser('./seeders/Cart_detailsSeed.json'),
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
		const options = {
			truncate: true,
		}
		await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 0', null, {
			raw: true
		});
		await queryInterface.bulkDelete('Cart_details', null, options);
		await queryInterface.bulkDelete('Carts', null, options);
		await queryInterface.bulkDelete('Order_details', null, options);
		await queryInterface.bulkDelete('Prescriptions', null, options);
		await queryInterface.bulkDelete('Medicine_ingredients', null, options);
		await queryInterface.bulkDelete('Orders', null, options);
		await queryInterface.bulkDelete('Payment_methods', null, options);
		await queryInterface.bulkDelete('Shipping_methods', null, options);
		await queryInterface.bulkDelete('Raw_materials', null, options);
		await queryInterface.bulkDelete('Medicines', null, options);
		await queryInterface.bulkDelete('Users', null, options);
		await queryInterface.bulkDelete('Units', null, options);
		await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 1', null, {
			raw: true
		});
	},
};
