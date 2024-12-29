const jwt = require("jsonwebtoken");
const User = require("../models/User")

const requireAuth = (req, res, next) =>
{
    const token = req.cookies.jwt;

    // Check if json web token exists & is verified
    if(token){
        jwt.verify(token, "secret key stuff", (err, decodedToken) => {
            if(err){
                console.log(err.message);
                res.redirect("/login");
            }
            else{
                console.log(decodedToken);
                next();
            }
        })
    }
    else{
        res.redirect("/login");
    }
}

// Check Current User
const checkUser = (req, res, next) => {
    const token = req.cookies.jwt;
    if(token)
    {
        jwt.verify(token, "secret key stuff", async (err, decodedToken) => {
            if(err){
                console.log(err.message);
                res.locals.user = null;
            }
            else{
                console.log(decodedToken);
                let user = await User.findById(decodedToken.id);
                res.locals.user = user;
                next();
            }
        })
    }
    else{
        res.locals.user = null;
        next();

    }
}

module.exports = { requireAuth, checkUser };