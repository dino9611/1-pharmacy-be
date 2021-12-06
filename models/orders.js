'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Orders extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	orders.init(
		{
			user_id: DataTypes.INTEGER,
			shipping_name: DataTypes.STRING,
			shipping_address: DataTypes.STRING,
			shipping_phone_number: DataTypes.INTEGER,
			shipping_method: DataTypes.INTEGER,
			payment_method: DataTypes.INTEGER,
			payment_image_proof: DataTypes.STRING,
			transaction_number: DataTypes.STRING,
			status: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: 'Orders',
		},
	);
	return Orders;
};
