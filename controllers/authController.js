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
    try {
        const user = await User.login(email, password);
        console.log('cookie: ',req.cookies);
        res.cookie('jwt','token2',{ httpOnly:true, maxAge:1000 * 10 });
        res.status(200).json({ user });
    } catch (error) {
        res.status(400).json({ error:error.message });
    }
}