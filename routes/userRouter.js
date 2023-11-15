const express = require("express");
const { user_get } = require("../controllers/userController");

const router = express.Router();

router.get("/user", user_get);

module.exports = router;
