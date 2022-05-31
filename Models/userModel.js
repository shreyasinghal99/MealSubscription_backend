
const  mongoose  = require('mongoose');
const emailValidator = require("email-validator");
const bcrypt = require("bcrypt")
const crypto = require("crypto")
const db_link = 'mongodb+srv://admin:C8TaBU2SX2w8bceo@cluster0.0un9q.mongodb.net/?retryWrites=true&w=majority'
    mongoose.connect(db_link)
    .then((db)=>{
        //console.log(db);
        console.log('user db Connected');
    }).catch((err)=>{
        console.log(err.message);
    })


    const userSchema = mongoose.Schema({
        name : {
            type : String,
            required : true
        },
        email : {
            type : String,
            required : true ,
            unique : true,
            validate : function(){
                return emailValidator.validate(this.email);
            }
        },
        password : {
            type : String,
            required : true,
            minLength : 8
        },
        confirmPassword : {
            type : String,
            required : true,
            minLength : 8,
            validate : function(){
                return this.password == this.confirmPassword
            }
        },
        role :{
            type : String,
            enum : ['admin','user','restaurantowner','deliveryboy'],
            default : 'user'
        },
        profileImage :{
            type : String,
            default : 'img/users/default.jpeg'
        },
        resetToken : String
    })


    // userSchema.pre('save',function(){
    //     console.log("pre called",this)
    // })

    // userSchema.post('save',function(doc){
    //     console.log("post called",doc)
    // })

    userSchema.pre('save',function(){
            this.confirmPassword = undefined
        })
    
    //model

    // userSchema.pre('save',async function(){
    //     const salt = await bcrypt.genSalt();
    //     const hashedValue = await bcrypt.hash(this.password,salt);
    //     //console.log(hashedValue)
    //     this.password = hashedValue
    // })
    userSchema.methods.createResetToken = function(){
        //use crypto to create random key
        let resetToken = crypto.randomBytes(32).toString("hex");
        this.resetToken = resetToken;
        return resetToken;
    }
    userSchema.methods.resetPasswordHandler = function(password,confirmPassword){
        //use crypto to create random key
        this.password = password;
        this.confirmPassword = confirmPassword;
        this.resetToken = undefined
        
    }



    const userModel = mongoose.model('userModel',userSchema);

    // (async function createUser(){
    //     let user ={
    //         name : "Jain",
    //         email : "mama@gmail.com" ,
    //         password : "123456789"    ,
    //         confirmPassword : "123456789"    ,
    //        };
    //      const data = await  userModel.create(user);
    //      console.log(data)
    // })()

    module.exports = userModel;