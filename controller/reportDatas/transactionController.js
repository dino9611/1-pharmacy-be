const db = require('../../models');
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
        try {
            const { id } = req.query;           

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
        try {
            const { id, status } = req.query;

            const datas = await sequelize.query(
                `SELECT o.transaction_number, DATE_FORMAT(o.createdAt, "%d %M %Y") AS createdAt,
                o.shipping_name AS recipent_name, o.shipping_phone_number AS recipent_phone_number, 
                o.shipping_address, sm.name AS shipping_method, sm.price AS shipping_cost
                FROM Users u
                JOIN Orders o
                ON o.UserId = u.id
                JOIN Order_details od
                ON od.OrderId = o.id
                JOIN Shipping_methods sm
                ON o.ShippingMethodId = sm.id
                WHERE u.id = ${id} and o.status = ${status}
                GROUP BY o.id;`,
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

    getOrderDetails: async (req, res) => {
        try {
            const { id, status } = req.query;

            const datas = await sequelize.query(
                `SELECT m.image AS medicine_image, m.name AS medicine_name, od.quantity, od.price, 
                o.payment_image_proof, (od.quantity * od.price) AS total_price
                FROM Users u
                JOIN Orders o
                ON o.UserId = u.id
                JOIN Order_details od
                ON od.OrderId = o.id
                JOIN Shipping_methods sm
                ON o.ShippingMethodId = sm.id
                JOIN Medicines m
                ON od.MedicineId = m.id
                WHERE u.id = ${id} AND o.status = ${status};`,
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
    }
};

