const express = require("express");
const router = express.Router();
const controller = require("./user.controller")
const auth = require("../../middleware/auth")

router.post("/register", controller.register)
router.post("/login", controller.login)
router.get("/profile", [auth.isAuthentication], controller.getUser)



module.exports = router;