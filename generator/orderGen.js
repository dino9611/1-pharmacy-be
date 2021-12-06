const fs = require('fs');
const faker = require('faker');
const { fake } = require('faker/locale/id_ID');
faker.locale = 'id_ID';

const seed = [];

for (let i = 0; i <= 50; i++) {
	const data = {
		user_id: Math.ceil(Math.random() * 200),
		shipping_name: faker.name.findName(),
		shipping_address: faker.address.streetAddress(),
		shipping_phone_number: faker.phone.phoneNumber().trim(' '),
		shipping_method: Math.ceil(Math.random() * 3),
		payment_method: Math.ceil(Math.random() * 4),
		payment_image_proof: faker.image.image(),
		transaction_number: faker.finance.creditCardNumber(),
		status: Math.ceil(Math.random() * 4),
	};

	seed.push(data);
	if (i === 50) {
		fs.writeFile('./orderSeed.json', JSON.stringify(seed), (err) => {
			if (err) {
				console.log(err);
			}
			console.log('write complete');
		});
	}
}
