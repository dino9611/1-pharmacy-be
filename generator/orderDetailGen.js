const fs = require('fs');
const faker = require('faker');
const { fake } = require('faker/locale/id_ID');
faker.locale = 'id_ID';

const seed = [];

for (let i = 0; i <= 100; i++) {
	const data = {
		order_id: Math.ceil(Math.random() * 50),
		medicine_id: Math.ceil(Math.random() * 50),
		quantity: Math.ceil(Math.random() * 10),
		price: 10000 * Math.ceil(Math.random() * 20),
	};

	seed.push(data);
	if (i === 100) {
		fs.writeFile('./orderDetailSeed.json', JSON.stringify(seed), (err) => {
			if (err) {
				console.log(err);
			}
			console.log('write complete');
		});
	}
}
