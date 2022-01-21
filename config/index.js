'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

const useDotEnv = process.env.USE_DOTENV === 'true';

export const URL = process.env.URL || 'http://localhost:3000';

let sequelize;
if (useDotEnv) {
	sequelize = new Sequelize(
		process.env.MYSQL_DATABASE || process.env.POSTGRES_DATABASE,
		process.env.MYSQL_USERNAME || process.env.POSTGRES_USERNAME,
		process.env.MYSQL_PASSWORD || process.env.POSTGRES_PASSWORD,
		{
			host: config.host,
			dialect: config.dialect
		},
	);
} else if (config.use_env_variable) {
	sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
	sequelize = new Sequelize(
		config.database,
		config.username,
		config.password,
		config,
	);
}

fs.readdirSync(__dirname)
	.filter((file) => {
		return (
			file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
		);
	})
	.forEach((file) => {
		const model = require(path.join(__dirname, file))(
			sequelize,
			Sequelize.DataTypes,
		);
		db[model.name] = model;
	});

Object.keys(db).forEach((modelName) => {
	if (db[modelName].associate) {
		db[modelName].associate(db);
	}
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
