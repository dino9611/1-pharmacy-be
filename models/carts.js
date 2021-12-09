module.exports = (sequelize, DataTypes) => {
	const Carts = sequelize.define('Carts', {
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER,
		},
		isCheckout: {
			type: DataTypes.BOOLEAN,
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
	return Carts;
};
