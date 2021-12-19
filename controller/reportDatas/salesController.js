const db = require('../../models');
const { QueryTypes } = require('sequelize');
const { sequelize } = require('../../config');

module.exports = {
    monthlySales: async (req, res) => {
        try {
            const datas = await sequelize.query(
                `SELECT MONTH(o.createdAt) AS monthId, MONTHNAME(o.createdAt) AS month, YEAR(o.createdAt) AS year,
                SUM(od.quantity * od.price) AS total_payment
                FROM Order_details od
                JOIN Orders o
                ON od.OrderId = o.id
                WHERE o.status = 3 and YEAR(o.createdAt) = 2021
                GROUP BY MONTH(o.createdAt), MONTHNAME(o.createdAt), YEAR(o.createdAt)
                ORDER BY MONTH(o.createdAt);`,
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

    medicineOrders: async (req, res) => {
        try {
            const datas = await sequelize.query(
                `SELECT m.name AS medicine, COUNT(m.name) AS total_medicine_orders
                FROM Orders o
                JOIN Order_details od
                ON od.OrderId = o.id
                JOIN Medicines m
                ON od.MedicineId = m.id
                WHERE o.status = 3 and YEAR(o.createdAt) = 2021
                GROUP BY m.name
                ORDER BY total_medicine_orders DESC
                LIMIT 10;`,
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

    currentOrdersStatus: async (req, res) => {
        try {
            const datas = await sequelize.query(
                `SELECT status, COUNT(status) AS current_orders
                FROM Orders
                WHERE YEAR(createdAt) = 2021
                GROUP BY status
                ORDER BY status ASC;`,
                {
                    type: QueryTypes.SELECT
                }
            );

            const statusText = {
                1: 'Order is Under Admin Review',
                2: 'Order is Accepted and Processed',
                3: 'Order is Successfully Delivered and Finished',
                4: 'Order is Failed or Declined'
            }

            console.log(datas);
            res.status(200).send(datas.map(data => ({
                ...data,
                status: statusText[data.status]
            })));
        } catch (err) {
            console.error(err.message);
            return res.status(500).send({ message: "Server error" });
        }
    },

    ordersByGender: async (req, res) => {
        try {
            const datas = await sequelize.query(
                `SELECT u.gender AS gender, COUNT(u.gender) AS total_orders
                FROM Orders o
                JOIN Users u
                ON o.UserId = u.id
                WHERE o.status = 3 AND YEAR(o.createdAt) = 2021
                GROUP BY u.gender
                ORDER BY total_orders DESC;`,
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

    ordersByAgeRange: async (req, res) => {
        try {
            const datas = await sequelize.query(
                `SELECT TIMESTAMPDIFF (YEAR, u.birthdate, CURDATE()) AS age,
                COUNT(u.birthdate) AS total_orders
                FROM Orders o
                JOIN Users u
                ON o.UserId = u.id
                WHERE o.status = 3 AND YEAR(o.createdAt) = 2021
                GROUP BY age
                ORDER BY age ASC;`,
                {
                    type: QueryTypes.SELECT
                }
            );

            let total_orders1 = 0;
            let total_orders2 = 0;
            let total_orders3 = 0;
            let total_orders4 = 0;
            let total_orders5 = 0;
            let total_orders6 = 0;

            datas.forEach((data, index) => {
                if (data.age > 0 && data.age < 20) {
                    total_orders1 += 1
                } else if (data.age >= 20 && data.age < 30) {
                    total_orders2 += 1
                } else if (data.age >= 30 && data.age < 40) {
                    total_orders3 += 1
                } else if (data.age >= 40 && data.age < 50) {
                    total_orders4 + 1
                } else if (data.age >= 50 && data.age < 60) {
                    total_orders5 + 1
                } else {
                    total_orders6 + 1
                };
            });

            res.status(200).send([
                { age: "Below 20", total_orders: total_orders1 },
                { age: "20-29", total_orders: total_orders2 },
                { age: "30-39", total_orders: total_orders3 },
                { age: "40-49", total_orders: total_orders4 },
                { age: "50-59", total_orders: total_orders5 },
                { age: "60 and over", total_orders: total_orders6 },
            ]);
        } catch (err) {
            console.error(err.message);
            return res.status(500).send({ message: "Server error" });
        }
    },
};

