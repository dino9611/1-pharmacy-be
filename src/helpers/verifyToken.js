const jwt = require("jsonwebtoken");

module.exports.verifyUserToken = () => {
    const key = "";
    return verifyTokenAccess(key, false);
}

module.exports.verifyAdminToken = () => {
    const key = "";
    return verifyTokenAccess(key, true);
}

const verifyTokenAccess = (key, isCheckingAdmin) => {
    return (req, res, next) => {
        const token = req.headers["Authorization"];

        if (!token) {
            return res.status(400).send({ message: "BAD REQUEST: Authorization header is required!" });
        }
        
        jwt.verify(token, key, (err, decoded) => {
            if (err) {
                return res.status(401).send({ message: "UNAUTHORIZED: You are not authorized!" });
            }

            req.user = decoded;

            try {
                const userData = await Users.findOne({
                    where: {
                        id: decoded.id,
                    }
                });

                if(userData && userData.isAdmin === isCheckingAdmin){
                    return next();
                } else {
                    return res.status(403).send({ message: "FORBIDDEN: You do not have access!" });
                }

            } catch(err) {
                console.error(err.message);
                return res.status(500).send({ message: "Server error" });
            }
        });
    };
};