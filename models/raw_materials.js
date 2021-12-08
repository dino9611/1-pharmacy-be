module.exports = (sequelize, DataTypes) => {
	const Raw_materials = sequelize.define('Raw_materials', {
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER,
		},
		name: {
			type: DataTypes.STRING,
		},
		price: {
			type: DataTypes.INTEGER,
		},
		bottle_quantity: {
			type: DataTypes.INTEGER,
		},
		quantity_per_bottle: {
			type: DataTypes.INTEGER,
		},
		stock_quantity: {
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

	return Raw_materials;
};

