const Users = require("../models/users");
const { Op } = require("sequelize");
const jwt = require("jsonwebtoken");
const { adminKey, userKey } = require("../helpers/constants");

module.exports = {
    login: async (req, res) => {
        try {
            const { usernameOrEmail, password } = req.body;
    
            if (!(usernameOrEmail && password)) {
                return res.status(400).send("BAD REQUEST: All input is required!");
            }
    
            const userData = await Users.findOne({
                where: {
                    [Op.or]: [{ username: usernameOrEmail }, { email: usernameOrEmail }]
                }
            })
    
            if((userData) && (await bcrypt.compare(password, userData.password))){
                const token = jwt.sign(
                    { id: userData.id },
                    userData.isAdmin === true ? adminKey : userKey,
                    {
                      expiresIn: "2h",
                    }
                );
                
                return res.status(200).send(token);
            }
            res.status(401).send("UNAUTHORIZED: Invalid Credentials");
        } catch (err) {
            console.error(err.message);
            return res.status(500).send({ message: "Server error" });
        }
    },

    dashboard: async (req, res) => {
        res.status(200).json({ message: "tes doanggg oke"})
    }
};

