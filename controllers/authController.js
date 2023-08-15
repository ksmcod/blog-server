const User = require('../models/User');

module.exports.register_post = async (req,res) => {
    const { username, email, password } = req.body;
    try {
        const user = await User.register(username, email, password);
        res.status(201).json({ user });
    } catch (error) {
        res.status(400).json({ error:error.message });        
    }
}

module.exports.login_post = async(req,res) => {
    const { email, password } = req.body;
    res.status(200).end("Success!");
}