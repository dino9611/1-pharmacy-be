const db = require('../../models');
const Order_details = db.Order_details;

module.exports = {
    salesReport: async (req, res) => {
        try {
            const sales = await Order_details.findAll();
            res.status(200).send(sales)
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

