const db = require('../../models');
const { QueryTypes } = require('sequelize');
const { sequelize } = require('../../config');

module.exports = {
    totalRevenue: async (req, res) => {
        try {
            const datas = await sequelize.query(
                `SELECT o.id, o.createdAt, o.transaction_number, o.status AS transaction_status, o.userId AS user_account_id, CONCAT(u.firstName, ' ', u.lastName) AS user_account_name,
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
                WHERE o.status = 3
                ORDER BY o.createdAt DESC;`,
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

    totalOrders: async (req, res) => {
        try {
            const datas = await sequelize.query(
                `SELECT COUNT(*) AS total_orders
                FROM Orders
                WHERE status = 3`,
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

    potentialRevenue: async (req, res) => {
        try {
            const datas = await sequelize.query(
                `SELECT SUM(IF(isCheckout = 0, 1, 0)) AS current_carts, 
                SUM(IF(isCheckout = 1, 1, 0)) AS current_checkout
                FROM Carts;`,
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
};
