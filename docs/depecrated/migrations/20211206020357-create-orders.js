'use strict';
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('Orders', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			user_id: {
				type: Sequelize.INTEGER,
			},
			shipping_name: {
				type: Sequelize.STRING,
			},
			shipping_address: {
				type: Sequelize.STRING,
			},
			shipping_phone_number: {
				type: Sequelize.INTEGER,
			},
			shipping_method: {
				type: Sequelize.INTEGER,
			},
			payment_method: {
				type: Sequelize.INTEGER,
			},
			payment_image_proof: {
				type: Sequelize.STRING,
			},
			transaction_number: {
				type: Sequelize.STRING,
			},
			status: {
				type: Sequelize.INTEGER,
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
	},
	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable('Orders');
	},
};
