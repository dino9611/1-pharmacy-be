const db = require('../../models');
const Orders = db.Orders;
const Order_details = db.Order_details;
const Medicines = db.Medicines;
const Carts = db.Carts;
const Cart_details = db.Cart_details;
const { QueryTypes } = require('sequelize');
const { sequelize } = require('../../config');

module.exports = {
    getUserDatas: async (req, res) => {
        try {
            const limit = parseInt(req.query.limit);            
            const page = parseInt(req.query.page);
            const offset = ((page + 1) * limit) - limit;

            const datas = await sequelize.query(
                `SELECT id, CONCAT(firstName, ' ', lastName) AS name, username, email
                FROM Users
                ORDER BY id
                LIMIT ${limit}
                OFFSET ${offset};`,
                {
                    type: QueryTypes.SELECT
                }
            );

            const countDatas = await sequelize.query(
            `SELECT COUNT(id) AS total_data
                FROM Users;`,
                {
                    type: QueryTypes.SELECT
                }
            );

            res.status(200).json({
                data: datas,
                meta: {
                    total: countDatas,
                    page,
                    limit,
                }
            });
        } catch (err) {
            console.error(err.message);
            return res.status(500).send({ message: "Server error" });
        }
    },

    getUserDetails: async (req, res) => {
        const { id } = req.query;   

        try {
            const datas = await sequelize.query(
                `SELECT gender, DATE_FORMAT(birthdate, "%d %M %Y") AS birthdate, address, isVerified
                FROM Users
                WHERE id = ${id};`,
                {
                    type: QueryTypes.SELECT
                }
            );

            const statusText = {
                0: "No",
                1: "Yes"
            }

            res.status(200).json({
                data: datas.map(data => ({
                    ...data,
                    isVerified: statusText[data.isVerified]
                }))
            });
        } catch (err) {
            console.error(err.message);
            return res.status(500).send({ message: "Server error" });
        }
    },

    getOrderHistory: async (req, res) => {
        const { id, status, filter, limit, page } = req.query;
        const offset = (page * limit) - limit;

        try {
            const myHistory = (filter === "user") ? `o.id = ${id}` : `o.id = ${id}`
            const selectedStatus = (status === "2") ?  `(o.status = 2 OR o.status = 3)` : `o.status = ${status}`
            const selectedId = (filter === "byUser") ? `u.id = ${id}` : `${myHistory}`
            const selectedFilter = (filter === "byOrder") ? `WHERE ${selectedStatus}` : `WHERE ${selectedId} AND o.status = ${status}`
            const pagination = (limit && page) ? `LIMIT ${limit} OFFSET ${offset}` : ``
            
            const datas = await sequelize.query(
                `SELECT o.id, o.transaction_number, DATE_FORMAT(o.createdAt, "%d %M %Y") AS createdAt,
                o.shipping_name AS recipent_name, o.shipping_phone_number AS recipent_phone_number, 
                o.shipping_address, sm.name AS shipping_method, sm.price AS shipping_cost,
                SUM(od.quantity * od.price) AS total_payment, o.payment_image_proof
                FROM Users u
                JOIN Orders o
                ON o.UserId = u.id
                JOIN Order_details od
                ON od.OrderId = o.id
                JOIN Shipping_methods sm
                ON o.ShippingMethodId = sm.id
                JOIN Medicines m
                ON od.MedicineId = m.id
                ${selectedFilter} 
                GROUP BY o.id
                ${pagination};`,
                {
                    type: QueryTypes.SELECT
                }
            );

            const countDatas = await sequelize.query(
                `SELECT COUNT(o.id) AS total_data
                FROM Users u
                JOIN Orders o
                ON o.UserId = u.id
                JOIN Order_details od
                ON od.OrderId = o.id
                ${selectedFilter};`,
                {
                    type: QueryTypes.SELECT
                }
            );

            // console.log(datas);
            res.status(200).json({
                data: datas.map(data => ({
                    ...data,
                    total_payment: parseInt(data.total_payment)
                })),
                meta: {
                    total: countDatas,
                    page,
                    limit,
                }
            });
        } catch (err) {
            console.error(err.message);
            return res.status(500).send({ message: "Server error" });
        }
    },

    getOrderDetails: async (req, res) => {
        const { id, status, filter, page } = req.query;
        const selectedStatus = (status === "2") ?  `(o.status = 2 OR o.status = 3)` : `o.status = ${status}`
        const selectedFilter = (filter === "byOrder") ? `WHERE o.id = ${id} AND ${selectedStatus}` : `WHERE u.id = ${id} and o.status = ${status}`
        const customPrescriptionField = (page === "customPrescription") ? `,p.id AS custom_prescription_id, p.image AS custom_prescription_image` : ``
        const customPrescriptionTable = (page === "customPrescription") ? `JOIN Prescriptions p ON m.PrescriptionId = p.id` : ``
        
        try {
            const datas = await sequelize.query(
                `SELECT o.id, sm.name AS shipping_method, sm.price AS shipping_cost, o.payment_image_proof,
                m.image AS medicine_image, m.name AS medicine_name, m.serving,
                od.price, od.quantity, (od.price * od.quantity) AS total_price
                ${customPrescriptionField}
                FROM Users u
                JOIN Orders o
                ON o.UserId = u.id
                JOIN Order_details od
                ON od.OrderId = o.id
                JOIN Shipping_methods sm
                ON o.ShippingMethodId = sm.id
                JOIN Medicines m
                ON od.MedicineId = m.id
                ${customPrescriptionTable}
                ${selectedFilter}`,
                {
                    type: QueryTypes.SELECT
                }
            );

            res.status(200).send(datas.map(data => ({
                ...data,
                total_price: parseInt(data.total_price),
                price: (data.medicine_name === "CUSTOM PRESCRIPTION" && status === "1") ? data.price = 0 : data.price,
                quantity: (data.medicine_name === "CUSTOM PRESCRIPTION" && status === "1") ? data.quantity = 1 : data.quantity,
                medicine_image: (data.medicine_name === "CUSTOM PRESCRIPTION") ? data.medicine_image = "https://www.researchgate.net/profile/Sandra-Benavides/publication/228331607/figure/fig4/AS:667613038387209@1536182760366/Indicate-why-the-prescription-is-not-appropriate-as-written.png" : data.medicine_image,
            })));
        } catch (err) {
            console.error(err.message);
            return res.status(500).send({ message: "Server error" });
        }
    },

    acceptOrRejectAction: async (req, res) => {
        const { id, newStatus } = req.query;
        const { prescriptionsToBeSubmitted } = req.body;
        // const { prescriptionsToBeSubmitted, orderDetails } = req.body;

        try {
            await Orders.update(
                { status: newStatus },
                { where: { id } }
            );

            // const getMedicineId = await Order_details.update(
            //     { 
            //         price: {
            //             [Op.in]: [prescriptionsToBeSubmitted.map(prescriptionToBeSubmitted => prescriptionToBeSubmitted.orderID)]
            //         }
            //     },
            //     { 
            //         where: { 
            //             MedicineID: {
            //                 [Op.in]: [orderDetails.map(orderDetail => orderDetail.medicine_id)]
            //             }
            //         } 
            //     }
            // );
            
            res.status(200).send({ message: "Order status is changed" }); 
        } catch (err) {
            console.error(err.message);
            return res.status(500).send({ message: "Server error" });
        }
    },

    getMaterialList: async (req, res) => {
		const { name } = req.query;

		try {
			const datas = await sequelize.query(
                `SELECT *
				FROM Raw_materials
				WHERE name LIKE '${name}%';`,
                {
                    type: QueryTypes.SELECT
                }
			)
            
            const seen = new Set();

            const newDatas = datas.filter(data => {
                const duplicate = seen.has(data.name);
                seen.add(data.name);
                return !duplicate;
            })
            
            res.status(200).send(newDatas);
		} catch (err) {
			console.error(err.message);
            return res.status(500).send({ message: "Server error" });
		}
	},

    onUserCheckout: async (req, res) => {
		const { user } = req;
        const { name, phoneNumber, address, picture} = req.body;

		try {
            const cart_id = await Carts.findOne({ 
                attributes: ['id'],
                where: { UserId: user.id } 
            });

            const cart_details = await Cart_details.findAll({ 
                attributes: ['MedicineId', 'quantity'],
                where: { CartId: cart_id.dataValues.id } 
            });

            const medicine_id_item = cart_details.map((medicine) => {
                return (
                    parseInt(medicine.dataValues.MedicineId)
                )
            })

            const medicine_price = await Medicines.findAll({
                attributes: ['price'],
                where: { id: medicine_id_item } 
            })

			await Carts.update(
                { 
                    isCheckout: 1
                },
                {
                    where: {
                        UserId: user.id
                    } 
                },
            );
            
            const newOrder = await Orders.create({
                shipping_name: name,
                shipping_address: address,
                shipping_phone_number: phoneNumber,
                status: 2,
                UserId: user.id,
                transaction_number: Math.floor(1000 + Math.random() * 9000),
            });

            const order_id = await Orders.findAll({ 
                attributes: ['id'],
                where: { id: newOrder.dataValues.id } 
            });

            const order_id_item = order_id.map((order) => {
                return (
                    order.dataValues.id
                )
            })

            await Order_details.bulkCreate(cart_details.map((cart_detail, index) => {
                return (
                    {
                        MedicineId: parseInt(cart_detail.dataValues.MedicineId),
                        quantity: parseInt(cart_detail.dataValues.quantity),
                        price: parseInt(medicine_price[index].dataValues.price),
                        OrderId: parseInt(order_id_item),
                    }
                )
            }))

            await Carts.destroy({
                where: { UserId: user.id },
            })

            res.status(200);
		} catch (err) {
			console.error(err.message);
            return res.status(500).send({ message: "Server error" });
		}
	}
};

