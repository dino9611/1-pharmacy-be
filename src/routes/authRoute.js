const express = require("express");
const router = express.Router();

const { authControllers } = require("../controllers");
const { adminLogin, userLogin } = authControllers;

const { verifyAdminToken, verifyUserToken } = require("../helpers");

router.get("/dashboard", verifyAdminToken, adminLogin);
router.get("/checkout", verifyUserToken, userLogin);

module.exports = router;