const jwt = require("jsonwebtoken");
const Blog = require("../models/Blog");

module.exports.blog_post = async (req, res) => {
  const { user_token } = req.cookies;
  const { title, content } = req.body;

  try {
    const { id } = jwt.verify(user_token, process.env.SECRET);
    const blog = await Blog.createBlog(title, content, id);
    res.status(201).json(blog);
  } catch (error) {
    console.log(error.message);

    if (error.name == "JsonWebTokenError") {
      return res.status(401).json({ error: error.message });
    }

    res.status(400).json({ error: error.message });
  }
};

module.exports.blogs_get = async (req, res) => {
  try {
    const latestBlogs = await Blog.find().sort({ createdAt: -1 });
    res.status(200).json(latestBlogs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
