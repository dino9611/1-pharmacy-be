const { Sequelize, DataTypes } = require('sequelize');
const mysql = require('mysql2/promise');

mysql
	.createConnection({
		host: '127.0.0.1',
		user: process.env.MYSQL_USERNAME,
		password: process.env.MYSQL_PASSWORD,
	})
	.then((connection) => {
		Promise.all([
			connection.query(
				`CREATE DATABASE IF NOT EXISTS \`${process.env.MYSQL_DATABASE}\`;`,
			),
		]);
	})
	.catch((err) => {
		console.log(err);
	});

const db = {};
const sequelize = new Sequelize(
	process.env.MYSQL_DATABASE,
	process.env.MYSQL_USERNAME,
	process.env.MYSQL_PASSWORD,
	{
		dialect: 'mysql',
		host: '127.0.0.1',
		pool: {
			max: 10,
			min: 0,
			acquire: 30000,
			idle: 1000,
		},
	},
);
sequelize.authenticate();

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Cart_details = require('./cart_details')(sequelize, DataTypes);
db.Carts = require('./carts')(sequelize, DataTypes);
db.Order_details = require('./order_details')(sequelize, DataTypes);
db.Orders = require('./orders')(sequelize, DataTypes);
db.Prescriptions = require('./prescriptions')(sequelize, DataTypes);
db.Raw_materials = require('./raw_materials')(sequelize, DataTypes);
db.Units = require('./units')(sequelize, DataTypes);
db.Users = require('./users')(sequelize, DataTypes);
db.Medicines = require('./medicines')(sequelize, DataTypes);
db.Medicine_ingredients = require('./medicine_ingredients')(
	sequelize,
	DataTypes,
);
db.Shipping_methods = require('./shipping_methods')(sequelize, DataTypes);
db.Payment_methods = require('./payment_methods')(sequelize, DataTypes);

//relations
db.Users.hasOne(db.Carts);
db.Carts.belongsTo(db.Users);
db.Carts.belongsToMany(db.Medicines, { through: db.Cart_details });
db.Medicines.belongsToMany(db.Carts, { through: db.Cart_details });
db.Orders.belongsToMany(db.Medicines, {
	through: db.Order_details,
});
db.Medicines.belongsToMany(db.Orders, {
	through: db.Order_details,
});
db.Units.hasMany(db.Raw_materials);
db.Units.hasMany(db.Medicine_ingredients);
db.Raw_materials.belongsToMany(db.Medicines, {
	through: db.Medicine_ingredients,
});
db.Medicines.belongsToMany(db.Raw_materials, {
	through: db.Medicine_ingredients,
});
db.Users.hasMany(db.Prescriptions);
db.Users.hasMany(db.Orders);
db.Prescriptions.hasMany(db.Medicines);
db.Shipping_methods.hasMany(db.Orders);
db.Payment_methods.hasMany(db.Orders);

sequelize.sync({ alter: false });

//fix bug for sync
module.exports = db;
