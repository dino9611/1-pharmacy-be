const jwt = require('jsonwebtoken');
const { adminKey, userKey } = require('../helpers/constants');

const verifyTokenAccess = (key, isCheckingAdmin) => {
    return (req, res, next) => {
        const token = req.headers["authorization"];
        
        if (!token) {
            return res.status(400).send({ message: "BAD REQUEST: Authorization header is required!" });
        };
        
        jwt.verify(token, key, async (err, decoded) => {
            if (err) {
                return res.status(401).send({ message: "UNAUTHORIZED: You are not authorized!" });
            };

            req.user = decoded;

            if(decoded.isAdmin === isCheckingAdmin){
                return next();
            } else {
                return res.status(403).send({ message: "FORBIDDEN: You do not have access!" });
            };
        });
    };
};

module.exports.verifyUserToken = () => {
    return verifyTokenAccess(userKey, false);
}

module.exports.verifyAdminToken = () => {
    return verifyTokenAccess(adminKey, true);
}