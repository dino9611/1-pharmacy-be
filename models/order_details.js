module.exports = (sequelize, DataTypes) => {
	const Order_details = sequelize.define('Order_details', {
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER,
		},
		quantity: {
			type: DataTypes.INTEGER,
		},
		price: {
			type: DataTypes.INTEGER,
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
	return Order_details;
};
