const jwt = require("jsonwebtoken");
const User = require("../models/User");

module.exports.user_get = async (req, res) => {
  const { user_token } = req.cookies;

  try {
    const { id } = jwt.verify(user_token, process.env.SECRET);
    const user = await User.findById(id, {
      username: true,
      email: true,
      _id: false,
    });
    res.status(200).json(user);
  } catch (error) {
    console.log(error.message);
    res.end();
  }
};

module.exports.user_post = async (req, res) => {
  const { username, email, password } = req.body;
  const { user_token } = req.cookies;

  try {
    const { id } = jwt.verify(user_token, process.env.SECRET);
    const user = await User.updateUser(id, username, email, password);
    res.status(200).json({ username: user.username, email: user.email });
  } catch (error) {
    console.log(error.message);

    if (error.name == "JsonWebTokenError") {
      return res.status(401).json({ error: error.message });
    }

    res.status(400).json({ error: error.message });
  }
};

module.exports.findById_get = async (req, res) => {
  const { id } = req.body;

  try {
    const user = await User.findById(id, { _id: false, username: true });
    res.status(200).json(user);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ error: error.message });
  }
};

module.exports.logout_post = async (req, res) => {
  const { user_token } = req.cookies;
  res.clearCookie("user_token");
  res.status(200).end();
};
