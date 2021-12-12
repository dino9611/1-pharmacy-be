const db = require('../../models');
const { QueryTypes } = require('sequelize');
const { sequelize } = require('../../config');

const transactionQuery = `SELECT o.id, o.createdAt, o.transaction_number, o.status AS transaction_status,
o.userId AS user_account_id, CONCAT(u.firstName, ' ', u.lastName) AS user_account_name, u.email, o.shipping_name, o.shipping_address, o.shipping_phone_number,
m.name AS medicine_ordered, od.price, od.quantity, sm.name AS shipping_method_via, sm.price AS shipping_cost,
((od.price * od.quantity) + sm.price) AS total_payment,
pm.name AS payment_method_via, o.payment_image_proof
FROM Orders o
JOIN Order_details od
ON od.OrderId = o.id
JOIN Payment_methods pm
ON o.PaymentMethodId = pm.id
JOIN Shipping_methods sm
ON o.ShippingMethodId = sm.id
JOIN Medicines m
ON od.MedicineId = m.id
JOIN Users u
ON o.userId = u.id `;

const filterUserTransactionHistory = `ORDER BY o.createdAt DESC
LIMIT 20;`

const filterAllTransactions = `ORDER BY o.createdAt DESC
LIMIT 50;`

module.exports = {
    getUserTransactions: async (req, res) => {
        const { filter } = req.query;
        const { user } = req;
        try {
            const queries = [transactionQuery];
            if (filter === "ongoing") {
                queries.push(`WHERE o.userId=${user.id} AND (o.status = 1 OR o.status = 2)`, filterUserTransactionHistory);
            } else if (filter === "past") {
                queries.push(`WHERE o.userId=${user.id} AND (o.status = 3 OR o.status = 4)`, filterUserTransactionHistory);
            }

            const transactions = await sequelize.query(
                queries.join(' '),
                {
                    type: QueryTypes.SELECT
                }
            );

            return res.status(200).json(transactions);
        } catch (err) {
            console.error(err.message);
            return res.status(500).json({ message: "Server error" });
        }
    },

    getAllTransactions: async (req, res) => {
        try {
            const queries = [transactionQuery, filterAllTransactions];
            const transactions = await sequelize.query(
                queries.join(' '),
                {
                    type: QueryTypes.SELECT
                });

            res.status(200).send(transactions)
        } catch (err) {
            console.error(err.message);
            return res.status(500).send({ message: "Server error" });
        }
    }
};

