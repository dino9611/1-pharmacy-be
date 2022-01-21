```js
const list = await Medicines.findOne({ where: { id: req.params.id } });

let order = await Orders.create({
	shipping_name: 'JNE',
	shipping_address: 'Jakarta',
	shipping_phone_number: '08645351389',
	payment_image_proof: 'asjhbasibfliuabweifbuawef',
	transaction_number: '0846513',
	status: 3,
});

//object return from create/update/find.add(set,get)Childmodel
order
	.addMedicines(medicine, {
		through: {
			quantity: 10,
			price: 10000,
			createdAt: new Date(),
			updatedAt: new Date(),
		},
	})
	.then((data) => {
		return data;
	})
	.catch((error) => {
		console.log(error);
	})
	.then((data) => {
		res.json({ medicine, order, data }); // => returning order with medicine and order_details data
	});
```

how to many to many? find data you want to pair with, you can create, find, and update
