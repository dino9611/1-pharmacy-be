module.exports = (sequelize, DataTypes) => {
	const Medicine_ingredients = sequelize.define('Medicine_ingredients', {
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
	return Medicine_ingredients;
};
