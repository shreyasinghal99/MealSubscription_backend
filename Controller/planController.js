const planModel = require('../Models/planModel')

module.exports.getAllPlans = async function getAllPlans(req, res) {
    try {
        let plans = await planModel.find();
        if (plans) {
            res.json({
                messgae: "All plans retrieved",
                data: plans
            })
        }
        else {
            res.json({
                messgae: "No plans yet"
            })
        }
    }
    catch (err) {
        res.status(500).json({
            messgae: err.messgae
        })
    }
}

module.exports.getPlan = async function getPlan(req, res) {
    try {
        let id = req.params.id
        let plan = await planModel.findById(id);
        if (plan) {
            res.json({
                messgae: "plan retrieved",
                data: plan
            })
        }
        else {
            res.json({
                messgae: "No plan "
            })
        }
    }
    catch (err) {
        res.status(500).json({
            messgae: err.messgae
        })
    }
}

module.exports.createPlan = async function createPlan(req, res) {
    try {
        
        let newPlan = req.body
        console.log(newPlan)
        let createdPlan = await planModel.create(newPlan);
       
        if (createdPlan) {
            
            res.json({
                messgae: "plan created",
                data: createdPlan
            })
        }
        else {
            res.json({
                messgae: "Couldnt create plan "
            })
        }
    }
    catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
}

module.exports.deletePlan = async function deletePlan(req, res) {
    try {
        let id = req.params.id
        let deletedPlan = await planModel.findByIdAndDelete(id);
        if (deletedPlan) {
            res.json({
                messgae: "plan deleted",
                data: deletedPlan
            })
        }
        else {
            res.json({
                message: "plan not found "
            })
        }
    }
    catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
}

module.exports.updatePlan = async function updatePlan(req, res) {
    try {
        let id = req.params.id;
        let dataToBeUpdated = req.body;
        let plan = await planModel.findById(id);
        
        if (plan) {
            let keys = []
            for (let key in dataToBeUpdated) {
                plan[key] = dataToBeUpdated[key]
            }
            
            await plan.save()
            
            res.json({
                message: "plan updated",
                data: plan
            })
        }
        else {
            res.json({
                message: "Couldnt update plan "
            })
        }
    }
    catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
}


module.exports.getTop3Plans = async function getTop3Plans(req,res) {
    try{
        let top3Plans = await planModel.find().sort({
            ratingsAverage : -1
        }).limit(3);
        res.json({
            message : "top 3 plans",
            data : top3Plans
        })
        

    }
    catch(err){
        res.json({
            message : err.message
        })
    }
}




