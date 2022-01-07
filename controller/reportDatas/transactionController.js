const db = require('../../models');
const Orders = db.Orders;
const { QueryTypes } = require('sequelize');
const { sequelize } = require('../../config');

const orderHistoryQuery = `SELECT o.transaction_number, DATE_FORMAT(o.createdAt, "%d %M %Y") AS createdAt,
o.shipping_name AS recipent_name, o.shipping_phone_number AS recipent_phone_number, 
o.shipping_address, sm.name AS shipping_method, sm.price AS shipping_cost,
SUM(od.quantity * od.price) AS total_payment
FROM Users u
JOIN Orders o
ON o.UserId = u.id
JOIN Order_details od
ON od.OrderId = o.id
JOIN Shipping_methods sm
ON o.ShippingMethodId = sm.id`;
// ^ jangan lupa tambahin: custom prescription image

const orderDetailsQuery = `SELECT m.image AS medicine_image, m.name AS medicine_name, od.quantity, od.price, 
o.payment_image_proof, (od.quantity * od.price) AS total_price
FROM Users u
JOIN Orders o
ON o.UserId = u.id
JOIN Order_details od
ON od.OrderId = o.id
JOIN Shipping_methods sm
ON o.ShippingMethodId = sm.id
JOIN Medicines m
ON od.MedicineId = m.id`;

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

            console.log(datas);
            res.status(200).json({
                data: datas,
                meta: {
                    total: countDatas,
                    page,
                    limit,
                }
            });
            console.log(countDatas)
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

            console.log(datas);
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
        const { id, status, filter, transaction_number } = req.query;

        try {
            const queries = [orderHistoryQuery];

            if(filter === "orderHistory"){
                queries.push(`WHERE u.id = ${id} and o.status = ${status} GROUP BY o.id;`);
            }else if(filter === "orderRequest"){
                queries.push(`WHERE o.status = ${status} GROUP BY o.id ORDER BY o.createdAt DESC;`);
            }else if(filter === "userDetails"){
                queries.push(`WHERE o.status = ${status} AND o.transaction_number = ${transaction_number} GROUP BY o.id;`)
            }

            const datas = await sequelize.query(
                queries.join(' '),
                {
                    type: QueryTypes.SELECT
                }
            );

            console.log(datas);
            res.status(200).send(datas.map(data => ({
                ...data,
                total_payment: parseInt(data.total_payment)
            })));
        } catch (err) {
            console.error(err.message);
            return res.status(500).send({ message: "Server error" });
        }
    },

    getOrderDetails: async (req, res) => {
        const { id, status, filter, transaction_number } = req.query;

        try {
            const queries = [orderDetailsQuery];

            if(filter === "orderHistory"){
                queries.push(`WHERE u.id = ${id} and o.status = ${status};`);
            }else if(filter === "orderRequest"){
                queries.push(`WHERE o.status = ${status} AND o.transaction_number = ${transaction_number} ORDER BY o.createdAt DESC;`);
            }

            const datas = await sequelize.query(
                queries.join(' '),
                {
                    type: QueryTypes.SELECT
                }
            );

            console.log(datas);
            res.status(200).send(datas);
        } catch (err) {
            console.error(err.message);
            return res.status(500).send({ message: "Server error" });
        }
    },

    changeOrderStatus: async (req, res) => {
        const { transaction_number, newStatus } = req.query;
        
        try {
            await Orders.update(
                { status: newStatus },
                { where: { transaction_number } }
            );

            res.status(200).send({ message: "Order status is changed" }); 
        } catch (err) {
            console.error(err.message);
            return res.status(500).send({ message: "Server error" });
        }
    },
};

