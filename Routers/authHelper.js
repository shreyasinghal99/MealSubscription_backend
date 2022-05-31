const jwt = require("jsonwebtoken");
const JWT_KEY = require('secret.js')

function protectRoute(req,res,next){
    let token;
    if(req.cookies.login){
        token = req.cookies.login
        let payload = jwt.verify(token,JWT_KEY);
        if(payload)next()
        else{
            res.json({
                message :"User Not Verified"
            })
        }
    }
    else{
        res.json({
            message :"Operation not allowed"
        })
    }

}

module.exports = protectRoute;