const express = require("express");
const { blog_post } = require("../controllers/blogController");

const router = express.Router();
router.post("/blog", blog_post);

module.exports = router;
