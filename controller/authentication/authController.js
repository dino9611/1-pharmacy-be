const Users = require('../../models/users');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');
const { adminKey, userKey } = require('../../helpers/constants');
const { generateSessionToken, generateForgotPasswordToken } = require('../../helpers/token');
const { transporter } = require('../../helpers/transporter');
const handlebars = require("handlebars");
const path = require("path");
const fs = require("fs");

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

    forgotPassword: async (req, res) => {
        try {
            const { email } = req.body;

            if (!email){
                return res.status(400).send("BAD REQUEST: Email is required!");
            };

            const userData = await Users.findOne({ where: { email } });

            if (userData){
                const emailToken = generateForgotPasswordToken(userData, userKey);

                let filepath = path.resolve(__dirname, "../../template/resetPasswordEmail.html");
                let htmlString = fs.readFileSync(filepath, "utf-8");
                const template = handlebars.compile(htmlString);

                const htmlToEmail = template({
                  token: emailToken
                });

                transporter.sendMail({
                  from: "Obatin Pharmaceuticals <katherinedavenia24@gmail.com>",
                  to: email,
                  subject: "Reset Password Confirmation",
                  html: htmlToEmail,
                });
            };
            return res.sendStatus(204);
        } catch (err) {
            console.error(err.message);
            return res.status(500).send({ message: "Server error" });
        }
    },

    resetPassword: async (req, res) => {
        try {
            const { newPassword } = req.body;
            const { id } = req.user;

            if(!newPassword){
                return res.status(400).send("BAD REQUEST: New password is required!");
            };

            const hashPassword = await bcrypt.hash(newPassword, 10);

            await Users.update(
                { password: hashPassword },
                { where: { id } }
            );

            return res.status(200).send({ message: "Reset password successful!" }); 
        } catch (err) {
            console.error(err.message);
            return res.status(500).send({ message: "Server error" });
        }
    },

    dashboard: async (req, res) => {
        res.status(200).json({ message: "tes doanggg oke"})
    }
};

