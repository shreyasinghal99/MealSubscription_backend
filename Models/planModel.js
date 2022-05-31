
const mongoose  = require('mongoose');

const db_link = 'mongodb+srv://admin:C8TaBU2SX2w8bceo@cluster0.0un9q.mongodb.net/?retryWrites=true&w=majority'
    mongoose.connect(db_link)
    .then((db)=>{
        //console.log(db);
        console.log('plan db Connected');
    }).catch((err)=>{
        console.log(err.message);
    })

    const planSchema = mongoose.Schema({
        name :{
            type: String,
            required : true,
            unique : true,
            maxLength : [20,"plan name shouldn't exceed 20 characters"]
           //maxLength : 20
        },
        duration :{
            type: Number,
           required : [true,'duration not entered']
           //required : true
        },
        price :{
            type: Number,
            required : [true,'Price not entered']
            //required : true
        },
        ratingsCount :{
            type : Number,
            default : function(){
                if(this.ratingsAverage == undefined)
                return 0;
                else return 1;
            }
        },
        ratingsAverage : {
            type: Number
            
        },
        discount :{
            type: Number,
            validate :[ function(){
                return this.discount<100;
            },"discount exceeding 100"]
            // validate : function(){
            //       return this.discount<100;
            //  }
        }
    });

   
    const planModel = mongoose.model('planModel',planSchema);
     
    // (async function createPlan(){
    //     let planObj ={
    //         name : "SuperPlanExclusive",
    //         duration : 30 ,
    //         price : 2000    ,
    //         ratingsAverage : 4.5   ,
    //         discount : 20
    //        };
    //     //any one of the two can be used
    //     //  const data = await  planModel.create(planObj);
    //     //  console.log(data)
    //     const data = new planModel(planObj)
    //     await data.save()
    // })()
    
    module.exports = planModel;