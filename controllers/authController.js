module.exports.register_post = async (req,res) => {
    const { username, email, password } = req.body;
    res.status(200).json({ result:'success'})
}

module.exports.login_post = async(req,res) => {
    const { email, password } = req.body;
    res.status(200).end("Success!");
}