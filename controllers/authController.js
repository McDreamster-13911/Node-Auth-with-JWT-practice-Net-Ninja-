const User = require("../models/User");


module.exports.signup_get = (req,res) => {
    res.render("Signup");
}

module.exports.login_get = (req,res) => {
    res.render("Login");
}

module.exports.signup_post = async (req,res) => {
    const { email, password } = req.body;

    try {
        const user = await User.create({ email, password });
        res.status(201).json(user);
    } catch (err) {
        console.log(err);
        res.status(400).send("Error, user not created");
    }
}

module.exports.login_post = async (req,res) => {
    const { email, password } = req.body;

    console.log(email, password)
    res.send("User login");
}