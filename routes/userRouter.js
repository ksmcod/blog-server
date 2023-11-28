const express = require("express");
const {
  user_get,
  logout_post,
  user_post,
} = require("../controllers/userController");

const router = express.Router();

router.get("/user", user_get);
router.post("/user", user_post);
router.post("/logout", logout_post);

module.exports = router;
