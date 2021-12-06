const fs = require('fs');
const faker = require('faker');
const { fake } = require('faker/locale/id_ID');
faker.locale = 'id_ID';

const seed = [];

for (let i = 0; i <= 200; i++) {
	const data = {
		firstName: faker.name.firstName(),
		lastName: faker.name.lastName(),
		gender: faker.name.gender('male', 'female'),
		birthdate: faker.date.past(30, new Date(2000, 0, 1)),
		address: faker.address.streetAddress(),
		username: faker.internet.userName(),
		email: faker.internet.email(),
		password: faker.internet.password(),
		avatar: faker.image.imageUrl(),
		role: false,
		isVerified: Math.floor(Math.random() * 2),
	};

	seed.push(data);
	if (i === 200) {
		fs.writeFile('./userSeed.json', JSON.stringify(seed), (err) => {
			if (err) {
				console.log(err);
			}
			console.log('write complete');
		});
	}
}
// let dataInput = fs.readFileSync('./userSeed.json', 'utf8');
// let data = JSON.parse(dataInput);
// let newData = data.map((element) => {
// 	let formatedDate = new Date(element.birthDate);
// 	element.birthDate = formatedDate;
// 	element.createdAt = faker.date.past();
// 	element.updatedAt = new Date();
// 	return element;
// });
// console.log(data);
