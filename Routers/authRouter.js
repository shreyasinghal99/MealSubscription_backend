const express = require('express');
const authRouter = express.Router();
const userModel = require('../Models/userModel');
const jwt = require("jsonwebtoken");
const JWT_KEY  = 'sdsfdgdfssdfsaewe3245';
const app = express();
authRouter.
    route('/signup')
    .get(middleware1, getSignUp, middleware2)
    


authRouter.
route('/login').get(getLogin)



function middleware1(req, res, next) {
    console.log("middleware1 called");
    next();

}

function middleware2(req, res) {
    console.log("middleware2 called");
    res.sendFile('/public/index.html', { root: __dirname })

}

function getSignUp(req, res, next) {
    console.log("next called");
    next()
}



function getLogin(req,res){
    res.send("login form");
}




module.exports = authRouter;