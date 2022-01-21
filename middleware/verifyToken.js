const jwt = require('jsonwebtoken');
const { adminKey, userKey } = require('../helpers/constants');

const verifyTokenAccess = (key, isCheckingAdmin) => {
    return (req, res, next) => {
        const token = req.headers.authorization.split(' ')[1];

        if (!token) {
            return res.status(400).send({ message: "Authorization header is required!" });
        };

        jwt.verify(token, key, async (err, decoded) => {
            if (err) {
                console.log(key, token, err)
                return res.status(401).send({ message: "You are not authorized!" });
            };

            req.user = decoded;

            if(isCheckingAdmin){
                if(decoded.isAdmin){
                    return next();
                } else {
                    return res.status(403).send({ message: "You do not have access!" });
                };
            } else {
                return next();
            }
        });
    };
};

module.exports.verifyToken = () => {
    return verifyTokenAccess(userKey, false);
}

module.exports.verifyAdminToken = () => {
    return verifyTokenAccess(adminKey, true);
}