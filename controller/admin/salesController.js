const Order_details = require('../../models/order_details');

module.exports = {
    salesReport: async (req, res) => {
        try {
            const sales = await Order_details.findAll({
                attributes: [
                    'id', 'quantity', 'price', 'medicineId'
                ]
            });
            res.status(200).send(sales)
        } catch (err) {
            console.error(err.message);
            return res.status(500).send({ message: "Server error" });
        }
    },
};

