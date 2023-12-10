const express = require("express");
const {
  user_get,
  logout_post,
  user_post,
  findById_get,
} = require("../controllers/userController");

const router = express.Router();

router.get("/", user_get); // GET current user logged in by using http-only cookie
router.get("/user/:id", findById_get); //GET username from database using id
router.post("/user", user_post); // UPDATE user from provided information
router.post("/logout", logout_post); // LOGOUT user and delete http-only cookie!

module.exports = router;
