const jwt = require("jsonwebtoken");
const Blog = require("../models/Blog");

module.exports.blog_post = async (req, res) => {
  const { user_token } = req.cookies;
  const { title, content } = req.body;

  try {
    const { id } = jwt.verify(user_token, process.env.SECRET);
    const blog = await Blog.create({ title, body: content, author: id });
    console.log("Blog created: ", blog);
    res.status(201).json(blog);
  } catch (error) {
    console.log(error.message);

    if (error.name == "JsonWebTokenError") {
      return res.status(401).json({ error: error.message });
    }

    res.status(400).json({ error: error });
  }
};
