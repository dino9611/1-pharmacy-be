const db = require('../../models');
const { QueryTypes } = require('sequelize');
const { sequelize } = require('../../config');

module.exports = {
    salesReport: async (req, res) => {
        try {
            const transactions = await sequelize.query(
                `SELECT o.id, o.createdAt, o.transaction_number, o.status AS transaction_status,
                o.userId AS user_account_id, CONCAT(u.firstName, ' ', u.lastName) AS user_account_name, u.email,
                m.name AS medicine_ordered, od.price, od.quantity, sm.price AS shipping_cost,
                ((od.price * od.quantity) + sm.price) AS total_payment
                FROM Orders o
                JOIN Order_details od
                ON od.OrderId = o.id
                JOIN Shipping_methods sm
                ON o.ShippingMethodId = sm.id
                JOIN Medicines m
                ON od.MedicineId = m.id
                JOIN Users u
                ON o.userId = u.id
                WHERE o.status = 3;`,
                {
                    type: QueryTypes.SELECT
                });

            console.log(transactions);
            res.status(200).send(transactions)
        } catch (err) {
            console.error(err.message);
            return res.status(500).send({ message: "Server error" });
        }
    },

    revenueReport: async (req, res) => {
        try {
            res.status(200).send({ message: "tes doang okeee" })
        } catch (err) {
            console.error(err.message);
            return res.status(500).send({ message: "Server error" });
        }
    }
};

