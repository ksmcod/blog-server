const express = require("express");
const { blog_post, blogs_get } = require("../controllers/blogController");

const router = express.Router();
router.post("/", blog_post);
router.get("/", blogs_get);

module.exports = router;
