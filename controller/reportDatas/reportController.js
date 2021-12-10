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
                }
            );

            console.log(transactions);
            res.status(200).send(transactions);
        } catch (err) {
            console.error(err.message);
            return res.status(500).send({ message: "Server error" });
        }
    },

    revenueReport: async (req, res) => {
        try {
            const transactions = await sequelize.query(
                `SELECT o.id, o.transaction_number, o.userId AS user_account_id, CONCAT(u.firstName, ' ', u.lastName) AS user_account_name,
                od.MedicineId, m.name AS medicine_ordered, od.quantity AS quantity_ordered, od.price AS medicine_selling_price,
                rm.name AS raw_material_name, mi.quantity AS raw_material_qty_in_medicine, unit.name AS unit, 
                rm.price AS raw_material_price, rm.quantity_per_bottle AS raw_material_qty_per_bottle, unit2.name AS unit,
                ROUND(rm.price / rm.quantity_per_bottle) AS price_per_unit,
                ( mi.quantity * ROUND(rm.price / rm.quantity_per_bottle)) AS raw_material_capital_price,
                (od.price - rm.quantity_per_bottle) AS total_profit
                FROM Orders o
                JOIN Order_details od
                ON od.OrderId = o.id
                JOIN Medicines m
                ON od.MedicineId = m.id
                JOIN Users u
                ON o.userId = u.id
                JOIN Medicine_ingredients mi
                ON mi.MedicineId = m.id
                JOIN Units unit
                ON mi.UnitId = unit.id
                JOIN Raw_materials rm
                ON mi.RawMaterialId = rm.id
                JOIN Units unit2
                ON rm.UnitId = unit2.id
                WHERE o.status = 3;`,
                {
                    type: QueryTypes.SELECT
                }
            );

            console.log(transactions);
            res.status(200).send(transactions);
        } catch (err) {
            console.error(err.message);
            return res.status(500).send({ message: "Server error" });
        }
    }
};

