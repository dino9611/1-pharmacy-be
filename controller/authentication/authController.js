const Users = require('../../models/users');
const { Op } = require('sequelize');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { adminKey, userKey } = require('../../helpers/constants');
const { generateSessionToken } = require('../../helpers/token');

module.exports = {
    register: async (req, res) => {
        try {
            const { firstName, lastName, username, email, password } = req.body;
            
            if (!(firstName && lastName && username && email && password)) {
                res.status(400).send("BAD REQUEST: All input is required!");
            };

            const userAlreadyExists = await Users.findOne({
                where: {
                    [Op.or]: [{ username }, { email }]
                }
            });

            if(userAlreadyExists){
                return res.status(409).send("CONFLICT: User already exists. Please go to login or input a different user!");
            }

            const hashPassword = await bcrypt.hash(password, 10);

            const newUserData = await Users.create({
                firstName,
                lastName,
                username,
                email: email.toLowerCase(),
                password: hashPassword,
            });

            const token = generateSessionToken(newUserData, userKey);

            newUserData.token = token;
            res.status(201).send(newUserData);
        } catch (err) {
            console.error(err.message);
            return res.status(500).send({ message: "Server error" });
        }
    },

    login: async (req, res) => {
        try {
            const { usernameOrEmail, password } = req.body;
    
            if (!(usernameOrEmail && password)) {
                return res.status(400).send("BAD REQUEST: All input is required!");
            };
    
            const userData = await Users.findOne({
                where: {
                    [Op.or]: [{ username: usernameOrEmail }, { email: usernameOrEmail }]
                }
            });
    
            if((userData) && (await bcrypt.compare(password, userData.password))){
                const token = generateSessionToken(userData, userData.isAdmin? true === adminKey : userKey)
                return res.status(200).send(token);
            };

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

