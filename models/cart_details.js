module.exports = (sequelize, DataTypes) => {
	const Cart_details = sequelize.define('Cart_details', {
		quantity: {
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
	return Cart_details;
};
