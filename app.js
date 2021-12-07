require('dotenv').config();

const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 8081;

const sequelize = require('./util/database');

app.use(cors());
app.use(express.json({ extended: true }));

app.use('/', require('./routes/index'));

app.listen(PORT, (req, res) => {
	sequelize
		.sync()
		.then((response) => {
			console.log('app connected to db');
		})
		.catch((err) => {
			console.log(err);
		});
	console.log('listening to port' + PORT);
});
