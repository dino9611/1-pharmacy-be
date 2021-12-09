module.exports = (sequelize, DataTypes) => {
	const Medicines = sequelize.define('Medicines', {
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
		description: {
			type: DataTypes.STRING,
		},
		image: {
			type: DataTypes.STRING,
		},
		serving: {
			type: DataTypes.INTEGER,
		},
		quantityInStock: {
			type: DataTypes.INTEGER,
			defaultValue: 0,
		},
		isDeleted: {
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
	return Medicines;
};
