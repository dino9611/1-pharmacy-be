require('dotenv').config();

const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 8081;

app.use(cors({ exposedHeaders: ['x-access-token'] }));

app.use(express.json());

app.use('/', require('./routes/index'));

app.listen(PORT, (req, res) => {
	console.log('listening to port' + PORT);
});
