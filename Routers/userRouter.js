const express = require('express');
const app = express();
const userRouter = express.Router();
const multer = require('multer')
const { getUser, getAllUsers, updateUser,
    deleteUser, uploadProfilePhoto } = require("../Controller/userController");

const { protectRoute, signup, login, isAuthorised, forgotpassword, resetpassword, logout } = require("../Controller/authController")

userRouter.
    route('/:id')
    .patch(updateUser)
    .delete(deleteUser)

userRouter.route('/signup')
    .post(signup)

userRouter.route('/login')
    .post(login)

userRouter.route('/forgotPassword')
    .post(forgotpassword)

userRouter.route('/resetPassword/:resetToken')
    .post(resetpassword)

userRouter.route('/logout')
    .get(logout)

const multerStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images');
    },
    filename: function (req, file, cb) {
        cb(null, `user-${Date.now()}.jpeg`);
    }
})

const filter = function (req, file, cb) {
    if (file.mimetype.startsWith("image")) {
        cb(null, true);
    }
    else {
        cb(new Error("Not an Image!!upload image"))
    }

}
const upload = multer({
    storage: multerStorage,
    fileFilter: filter
})

userRouter.post("/profileImage", upload.single('photo'), uploadProfilePhoto);

userRouter.get("/profileImage", function (req, res) {
    res.sendFile("C:/Users/modern/Documents/PepDev/BackEnd/foodApp/multer.html")
});


userRouter.use(protectRoute);
userRouter.route('/userprofile')
    .get(getUser)

userRouter.use(isAuthorised(['admin']));

userRouter
    .route('')
    .get(getAllUsers)

// userRouter
//     .route('/setCookies')
//     .get(setCookies)

// userRouter
//     .route('/getCookies')
//     .get(getCookies)

// app.get("/user",(req,res)=>{
//     console.log(req.query)
//     res.send(users);
// })





module.exports = userRouter;