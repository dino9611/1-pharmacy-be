require('dotenv').config();
const sequelize = require('./database');

const Cart_details = require('../models/cart_details');
const Carts = require('../models/carts');
const Order_details = require('../models/order_details');
const Orders = require('../models/orders');
const Prescriptions = require('../models/prescriptions');
const Raw_materials = require('../models/raw_materials');
const Units = require('../models/units');
const Users = require('../models/users');
const Medicines = require('../models/medicines');
const Medicine_ingredients = require('../models/medicine_ingredients');
const Shipping_methods = require('../models/shipping_methods');
const Payment_methods = require('../models/payment_methods');

Users.hasOne(Carts);
Carts.belongsTo(Users);
Carts.belongsToMany(Medicines, { through: Cart_details });
Medicines.belongsToMany(Carts, { through: Cart_details });
Orders.belongsToMany(Medicines, {
	through: Order_details,
});
Medicines.belongsToMany(Orders, {
	through: Order_details,
});
Units.hasMany(Raw_materials);
Units.hasMany(Medicine_ingredients);
Raw_materials.belongsToMany(Medicines, {
	through: Medicine_ingredients,
});
Medicines.belongsToMany(Raw_materials, {
	through: Medicine_ingredients,
});
Medicines.hasMany(Prescriptions);
Users.hasMany(Prescriptions);
Prescriptions.belongsTo(Medicines);
Shipping_methods.hasMany(Orders);
Payment_methods.hasMany(Orders);

sequelize
	.sync()
	.then((result) => {
		console.log(result);
	})
	.catch((err) => {
		console.log(err);
	});
