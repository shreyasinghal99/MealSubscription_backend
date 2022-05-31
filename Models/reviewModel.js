const  mongoose  = require('mongoose');
const db_link = 'mongodb+srv://admin:C8TaBU2SX2w8bceo@cluster0.0un9q.mongodb.net/?retryWrites=true&w=majority'
    mongoose.connect(db_link)
    .then((db)=>{
        //console.log(db);
        console.log('review db Connected');
    }).catch((err)=>{
        console.log(err.message);
    })

    const reviewSchema = mongoose.Schema({
        review :{
            type:String,
            required : [true,'review is required']
        },
        rating :{
            type:Number,
            min:1,
            max:10,
            required : [true,'review is required']
        },
        createdAt : {
            type : Date,
            default : Date.now()
        },
        user :{
            type : mongoose.Schema.ObjectId,
            ref : 'userModel',
            required : [true,'review must belong to a user'],
        },
        plan :{
            type : mongoose.Schema.ObjectId,
            ref : 'planModel',
            required : [true,'review must belong to a plan'],
        }
    })

    reviewSchema.pre(/^find/, function (next)
      {
        this.populate({
            path : "user",
            select : "name profileImage"
        }).populate("plan");
        next();
    })
    

    const reviewModel = mongoose.model('reviewModel',reviewSchema);

    module.exports = reviewModel;