// const Cart_details = sequelize.define('Cart_details', {
// id: {
// 	allowNull: false,
// 	autoIncrement: true,
// 	primaryKey: true,
// 	type: Sequelize.INTEGER,
// },
// quantity: {
// 	type: Sequelize.INTEGER,
// },
// createdAt: {
// 	allowNull: false,
// 	type: Sequelize.DATE,
// },
// updatedAt: {
// 	allowNull: false,
// 	type: Sequelize.DATE,
// },
// });

module.exports = (sequelize, DataTypes) => {
	const Cart_details = sequelize.define('Cart_details', {
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER,
		},
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
