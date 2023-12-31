const jwt = require("jsonwebtoken");
const User = require("../models/User");

function createToken(payload) {
  return jwt.sign(payload, process.env.SECRET, { expiresIn: 60 * 5 });
}

module.exports.register_post = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const user = await User.register(username, email, password);
    const token = createToken({ id: user._id });
    res.cookie("user_token", token, { httpOnly: true, maxAge: 1000 * 60 * 5 });
    res.status(201).json({ email: user.email, username: user.username });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports.login_post = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    // console.log('cookie: ',req.cookies);
    const token = createToken({ id: user._id });
    res.cookie("user_token", token, { httpOnly: true, maxAge: 1000 * 60 * 10 });
    res.status(200).json({ email: user.email, username: user.username });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
