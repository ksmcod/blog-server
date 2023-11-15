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
    res.sendStatus(401);
  }
};
