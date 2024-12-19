module.exports.signup_get = (req,res) => {
    res.render("Signup");
}

module.exports.login_get = (req,res) => {
    res.render("Login");
}

module.exports.signup_post = (req,res) => {
    const { email, password } = req.body;

    console.log(email, password)
    res.send("New Signup");
}

module.exports.login_post = (req,res) => {
    const { email, password } = req.body;

    console.log(email, password)
    res.send("User login");
}