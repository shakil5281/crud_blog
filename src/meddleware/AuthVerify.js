const jwt = require("jsonwebtoken");

const checkLogin = (req, res, next) => {
try{

    let token=req.headers['token'];
    const decoded = jwt.verify(token, process.env.SECRET_KEY)
    const {userId, email, firstName, lastName} = decoded
    req.userId = userId
    req.email = email
    req.firstName = firstName
    req.lastName = lastName
    next()
    }
     catch(err) {
        res.status(401).json({error: err.message})
        next("Authentication failure!");

    }
};

module.exports = checkLogin;