const db = require('../../models');
const { QueryTypes } = require('sequelize');
const { sequelize } = require('../../config');

module.exports = {
    totalRevenue: async (req, res) => {
        const { filter } = req.query;
        const selectedFilter = (filter) ? `WHERE NOT o.status = 4` : `WHERE o.status = 3`

        try {
            const datas = await sequelize.query(
                `SELECT SUM((od.price - (mi.quantity * ROUND(rm.price / rm.quantity_per_bottle))) * od.quantity) AS total_revenue
                FROM Orders o
                JOIN Order_details od
                ON od.OrderId = o.id
                JOIN Medicines m
                ON od.MedicineId = m.id
                JOIN Medicine_ingredients mi
                ON mi.MedicineId = od.MedicineId
                JOIN Raw_materials rm
                ON mi.RawMaterialId = rm.id    
                ${selectedFilter}
                ORDER BY o.createdAt DESC;`,
                {
                    type: QueryTypes.SELECT
                }
            );

            console.log(datas);
            res.status(200).send(datas.map(data => ({
                ...data,
                total_revenue: parseInt(data.total_revenue)
            })));
        } catch (err) {
            console.error(err.message);
            return res.status(500).send({ message: "Server error" });
        }
    },

    monthlyRevenue: async (req, res) => {
        const { year, filter } = req.query;
        const selectedFilter = (filter) ? `AND o.status = 3` : `AND NOT o.status = 4`

        try {
            const datas = await sequelize.query(
                `SELECT MONTHNAME(o.createdAt) AS month, YEAR(o.createdAt) AS year,
                SUM((od.price - (mi.quantity * ROUND(rm.price / rm.quantity_per_bottle))) * od.quantity) AS total_revenue
                FROM Order_details od
                JOIN Orders o
                ON od.OrderId = o.id
                JOIN Medicines m
                ON od.MedicineId = m.id
                JOIN Medicine_ingredients mi
                ON mi.MedicineId = od.MedicineId
                JOIN Raw_materials rm
                ON mi.RawMaterialId = rm.id
                WHERE YEAR(o.createdAt) = ${year} ${selectedFilter}
                GROUP BY MONTH(o.createdAt), MONTHNAME(o.createdAt), YEAR(o.createdAt)
                ORDER BY MONTH(o.createdAt);`,
                {
                    type: QueryTypes.SELECT
                }
            );

            console.log(datas);
            res.status(200).send(datas.map(data => ({
                ...data,
                total_revenue: parseInt(data.total_revenue)
            })));
        } catch (err) {
            console.error(err.message);
            return res.status(500).send({ message: "Server error" });
        }
    },

    totalOrders: async (req, res) => {
        try {
            const datas = await sequelize.query(
                `SELECT COUNT(*) AS total_orders
                FROM Orders o
                JOIN Order_details od
                ON od.OrderId = o.id
                WHERE o.status = 3`,
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

    potentialOrders: async (req, res) => {
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
