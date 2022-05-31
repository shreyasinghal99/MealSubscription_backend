const res = require('express/lib/response');
const userModel = require('../Models/userModel')

module.exports.getUser = async function getUser(req, res) {
    //let userObjs = await userModel.find();  //to find all the data
    console.log("get user called");
    try {
        let id = req.id;
        console.log("id",id);
        let user = await userModel.findById(id) //to find one particualr data
        if (user) {
            res.json({
                message: "user found",
                data: user
            })
        }
        else {
            res.json({
                message: "user not found"
            })
        }
    }
    catch {
        res.json({
            message: err.message
        })
    }
}




module.exports.updateUser = async function updateUser(req, res) {
    try {
        let id = req.params.id;
        let dataToBeUpdated = req.body;
        let user = await userModel.findById(id);
        if (user) {
            let keys = []
            for (let key in dataToBeUpdated) {
                keys.push(key);
            }
            for (let i = 0; i < keys.length; i++) {
                user[keys[i]] = dataToBeUpdated[keys[i]];
            }
            const updatedData = user.save();
            res.json({
                message: "data updated successfully",
                data: user
            })
        }
        else {
            res.json({
                message: "user not found"
            })
        }
    }
    catch {
        res.json({
            message: err.message
        })
    }
}


module.exports.deleteUser = async function deleteUser(req, res) {
    try {
        let id = req.params.id;
        let user = await userModel.findByIdAndDelete(id)
        if (user) {
            res.json({
                message: "data deleted successfully",
                data: user
            })
        }
        else {
            res.json({
                message: "user not found"
            })
        }
    }
    catch
    {
        res.json({
            message: err.message
        })
    }
}

module.exports.getAllUsers = async function getAllUsers(req, res) {
    try {
        let users = await userModel.find();

        if(users)
        {res.json({
            message: "users retrieved",
            data: users
        })}
        else{
            res.json({
                message: "no users found"
            })
        }
    }
    catch
    {
        res.json({
            message: err.message
        })
    }

}

module.exports.uploadProfilePhoto = function uploadProfilePhoto(req,res){
    res.json({
        message : "Image uploaded successfully"
    })
}

//module.exports.postUser = function postUser(req, res) {
    //     //console.log(req.body);
    //     users = req.body
    //     res.json({
    //         message: "data receive successfully",
    //         user: req.body
    //     })
    // }

// app.get('/user/:userName', (req, res) => {
//     console.log("req", req.params.userName)
//     res.send("user name received");
// })


// function setCookies(req, res) {
//     res.cookie('isLoggedIn', true, { maxAge: 1000 * 60 * 60 * 24, secure: true, httpOnly: true });
//     res.send("Cookies have been set")
// }

// function getCookies(req, res) {
//     const cookies = req.cookies;
//     console.log(cookies)
//     res.send("cookies received")
// }