const db = require('../../models/');
const Users = db.Users;
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');
const { adminKey, userKey } = require('../../helpers/constants');
const {
	generateSessionToken,
	generateForgotPasswordToken,
	generateEmailVerificationToken,
} = require('../../helpers/token');
const { transporter } = require('../../helpers/transporter');
const handlebars = require("handlebars");
const path = require("path");
const fs = require("fs");
const { authSchema } = require('../../helpers/validationSchema');

module.exports = {
    register: async (req, res) => {
        try {            
            const result = await authSchema.validateAsync(req.body);

            const userAlreadyExists = await Users.findOne({
                where: {
                    [Op.or]: [{ username: result.username }, { email: result.email }]
                }
            });

            if(userAlreadyExists){
                throw { message: "User already exists. Please go to login or input a different user" };
            }

            const hashPassword = await bcrypt.hash(result.password, 10);

            const newUserData = await Users.create({
                ...result,
                password: hashPassword,
            });

            const token = generateSessionToken(newUserData, userKey)
            const dataEmailToken = {
                ...newUserData.dataValues,
                created: new Date().getTime()
            };
            console.log(dataEmailToken);
            const emailToken = generateEmailVerificationToken(dataEmailToken, userKey);
            
            newUserData.token = token;
            // res.set("x-access-token", token);

            let filepath = path.resolve(__dirname, "../../template/verifyAccountEmail.html");
            let htmlString = fs.readFileSync(filepath, "utf-8");
            const template = handlebars.compile(htmlString);

            const htmlToEmail = template({
                token: emailToken
            });

            transporter.sendMail({
                from: "Obatin Pharmaceuticals <katherinedavenia24@gmail.com>",
                to: "katherinedavenia24@gmail.com",
                subject: "Verify Email Confirmation",
                html: htmlToEmail,
            });

            res.status(201).send({
                ...newUserData.dataValues,
                token,
            });
        } catch (err) {
            if(err.isJoi) err.status = 422;
            console.error(err.message);
            return res.status(500).send({ message: err.message || "Server error" });
        }
    },

    login: async (req, res) => {
        try {
            const { usernameOrEmail, password } = req.body;
    
            if (!(usernameOrEmail && password)) {
                throw { message: "All input is required" };
            };
    
            const userData = await Users.findOne({
                where: {
                    [Op.or]: [{ username: usernameOrEmail }, { email: usernameOrEmail }]
                }
            });
    
            if((userData) && (await bcrypt.compare(password, userData.password))){
                const token = generateSessionToken(userData, userData.isAdmin? adminKey : userKey)
                userData.token = token

                return res.status(200).send({
                    ...userData.dataValues,
                    token,
                });
            };
            
            throw { message: "Username or password is incorrect" };
        } catch (err) {
            console.error(err.message);
            return res.status(500).send({ message: err.message || "Server error" });
        }
    },

    forgotPassword: async (req, res) => {
        try {
            const { email } = req.body;

            if (!email){
                throw { message: "Email is required" };
            };

            const userData = await Users.findOne({ where: { email } });

            if (userData){
                console.log(userKey);
                const emailToken = generateForgotPasswordToken(userData, userKey);

                let filepath = path.resolve(__dirname, "../../template/resetPasswordEmail.html");
                let htmlString = fs.readFileSync(filepath, "utf-8");
                const template = handlebars.compile(htmlString);

                const htmlToEmail = template({
                    token: emailToken
                });

                transporter.sendMail({
                    from: "Obatin Pharmaceuticals <katherinedavenia24@gmail.com>",
                    to: "katherinedavenia24@gmail.com",
                    subject: "Reset Password Confirmation",
                    html: htmlToEmail,
                });
            };

            console.log(userData);
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
                throw { message: "New password is required"};
            };

            const hashPassword = await bcrypt.hash(newPassword, 10);

            await Users.update(
                { password: hashPassword },
                { where: { id } }
            );

            return res.status(200).send({ message: "Reset password successful" }); 
        } catch (err) {
            console.error(err.message);
            return res.status(500).send({ message: "Server error" });
        }
    },

    verifyAccount: async (req, res) => {
        const { id } = req.user;

        try {
            await Users.update(
                { isVerified: true },
                { where: { id } }
            );

            return res.status(200).send({ message: "Account verification is successful" }); 
        } catch (err) {
            console.error(err.message);
            return res.status(500).send({ message: "Server error" });
        }
    }
};
