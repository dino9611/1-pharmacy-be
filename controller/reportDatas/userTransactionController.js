const db = require('../../models');
const Users = db.Users;
const { QueryTypes } = require('sequelize');
const { sequelize } = require('../../config');

module.exports = {
    ongoingTransactions: async (req, res) => {
        
    },

    pastTransactions: async (req, res) => {
        
    },

    allTransactions: async (req, res) => {
        try {
            const transactions = await sequelize.query(
                `SELECT o.id, o.transaction_number, o.status AS transaction_status,
                o.shipping_name, o.shipping_address, o.shipping_phone_number,
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
                ON od.MedicineId = m.id`,
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

