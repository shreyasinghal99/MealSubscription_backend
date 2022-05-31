const express = require('express');
const userModel = require('../Models/userModel');
const jwt = require("jsonwebtoken");
const JWT_KEY = 'sdsfdgdfssdfsaewe3245';
const app = express();
const {sendMail} = require('../utility/nodemailer')
module.exports.signup = async function signup(req, res) {
    try {
        let dataToBePosted = req.body;
        let user = await userModel.create(dataToBePosted);
        //console.log("backend",user)
        if (user) {
            sendMail("signup",user);
            res.json({
                message: "user signed up",
                data: user
            })
        }
        else {
            res.json({
                message: "user couldn't sign up",
            })
        }
    }
    catch(err) {

        res.status(500).json({

            message: err.message
        })

    }

}

module.exports.login = async function login(req, res) {
    try {
        let data = req.body;

        if (data.email && data.password) {
            let user = await userModel.findOne({ email: data.email });

            if (user) {

                // use bcrypt compare to find the matching hash
                if (user.password === data.password) {

                    let uid = user['_id']; //uid
                    let token = jwt.sign({ payload: uid }, JWT_KEY);
                    res.cookie("login", token, { httpOnly: true });
                    res.json({
                        message: "login successful",
                        userDetails: data
                    })
                }
                else {
                    res.json({
                        message: " credentials are wrong"
                    })
                }
            }

            else
                res.json({
                    message: "user not found"
                });
        }
        else {
            res.json({
                message: "empty fields"
            })
        }
    }
    catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
}



module.exports.isAuthorised = function isAuthorised(roles) {
    return function (req, res, next) {
        //console.log(req)
        if (roles.includes(req.role) == true) {
            next();
        }
        else {
            res.status(401).json({ message: "unauthorized" })
        }
    }
}

//protect route
module.exports.protectRoute = async function protectRoute(req, res, next) {
   
    try {
        let token;
        if (req.cookies.login) {
            token = req.cookies.login
            let payload = jwt.verify(token, JWT_KEY);
            if (payload) {
                const user = await userModel.findById(payload.payload);
                req.role = user.role;
                req.id = user.id;
                
                next();
            }
            else {
                res.json({
                    message: "User Not Verified"
                })
            }
        }
        else {
            const client = req.get('User-Agent')
            if (client.includes("Chrome")) {
                return res.redirect('/login');
            }
            else {
                res.json({
                    message: "login again"
                })
            }
        }
    }
    catch(err) {
        res.json({
            message: err.message
        })
    }


}

//forgotPassword

module.exports.forgotpassword = async function forgotPassword(req, res) {
    try {
        const { email } = req.body;
        const user = await userModel.findOne({ email: email });
        if (user) {
            //create new jwt
            const resetToken = user.createResetToken();
            let resetPasswordLink = `${req.protocol}://${req.get('host')}/user/resetPassword/${resetToken}`
            //send mail using nodemailer
            let obj = {
                email:user.email,
                resetPasswordLink:resetPasswordLink
            }
            sendMail("resetpassword",obj)
            res.json({
                message: "mail sent"
            })

        }
        else {
            res.json({
                message: "signup first"
            })

        }
    }
    catch (err) {
        res.status(500).json({
            message: err.message
        })
    }


}

module.exports.resetpassword = async function resetpassword(req, res) {
    try {
        let token = req.params.resetToken;
        let { password, confirmPassword } = req.body;
        const user = await userModel.findOne({ resetToken: token })
        console.log("user",user)
        if (user) {
            if (password === confirmPassword) {
                user.resetPasswordHandler(password, confirmPassword);
                await user.save();
            }
            else {
                res.json({
                    message: "passwords do not match"
                })
            }

        }
        else {
            res.json({
                message: "user not found"
            })
        }

    }
    catch (err) {
        res.json({
            message: err.message
        })
    }
}


module.exports.logout = async function logout(req,res){
    
    res.cookie('login',' ',{maxAge :1 });
    res.json({
        message : "user logged out successfully",
         
    })
}