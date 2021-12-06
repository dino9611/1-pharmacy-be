'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Order_details extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	order_details.init(
		{
			order_id: DataTypes.INTEGER,
			medicine_id: DataTypes.INTEGER,
			quantity: DataTypes.INTEGER,
			price: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: 'Order_details',
		},
	);
	return Order_details;
};
