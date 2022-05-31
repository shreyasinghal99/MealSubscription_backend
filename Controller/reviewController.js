
const planModel = require('../Models/planModel');
const reviewModel = require('../Models/reviewModel')


module.exports.getAllReviews = async function getAllReviews(req, res) {
    try {
        const reviews = await reviewModel.find();
        if (reviews) {
            res.json({
                message: "no reviews yet",
                data: reviews
            })
        }
        else {
            res.json({
                message: "no reviews yet"
            })
        }

    }
    catch (error) {
        res.json({
            message: error.message
        })
    }
}

module.exports.getTop3Reviews = async function getTop3Reviews(req, res) {
    try {
        const top3reviews = await reviewModel.find().sort({
            rating: -1
        }).limit(3)

        if (top3reviews) {
            res.json({
                data: top3reviews
            })
        }
        else {
            res.json({
                message: "no reviews yet"
            })
        }
    }
    catch (error) {
        res.json({
            message: error.message
        })
    }
}

module.exports.getPlansReviews = async function getPlansReviews(req, res) {
    try {
        let planId = req.params.id;
        let reviewsById = await reviewModel.find();
        
        if (reviewsById) {
              reviewsById = reviewsById.filter((review)=>{
                 return review.plan._id == planId
             })
            res.json({
                message: "reviews available for this plan",
                data: reviewsById
            })

        }
        else {
            res.json({
                message: "No reviews for this plan yet"
            })
        }
    }
    catch (err) {
        res.json({
            message: err.message
        })
    }


}

module.exports.createReview = async function createReview(req, res) {
    try {
        let id = req.params.plan;
        console.log(id);
        const plan = await planModel.findById(id);
        console.log(plan);
        
        let data = req.body;
        let createdReview = await reviewModel.create(data);

        if (createdReview) {

            // plan.ratingsAverage = ((plan.ratingsAverage*plan.ratingsCount)+createdReview.rating)/ (plan.ratingsCount+1)
            plan.ratingsAverage = plan.ratingsAverage ===undefined?createdReview.rating :  newAvgRating( plan.ratingsAverage, createdReview.rating, plan.ratingsCount)
            plan.ratingsCount += 1;
            await plan.save()
            res.json({
                message: "review created",
                data: createdReview

            })
        }
        else {
            res.json({
                message: "couldn't create review"
            })
        }
    }
    catch (err) {
        res.json({
            message: err.message
        })
    }
}

function newAvgRating(currentAvg, newRating, currentCount) {
    let newAvg = ((currentAvg * currentCount) + newRating) / (currentCount + 1)
    return newAvg;

}
module.exports.updateReview = async function updateReview(req, res) {
    try {
        let planid = req.params.plan;
        let id = req.body.id;
        console.log(id);
        let dataToBeUpdated = req.body;

        const review = await reviewModel.findById(id);
        if (review) {
            for (let key in dataToBeUpdated) {
                 if(key == 'id')continue;
                review[key] = dataToBeUpdated[key]
            }
            await review.save();
            res.json({
                message: "review updated",
                data: review
            })

        }
        else {
            res.json({
                message: "review not found",

            })
        }
    }
    catch (err) {
        res.json({
            message: err.message
        })
    }
}

module.exports.deleteReview = async function deleteReview(req, res) {
    try {
        let planid = req.params.plan
        let id = req.body.id;
        const deletedReview = await reviewModel.findByIdAndDelete(id);
        const planAfterDelete = await planModel.findById(planid);
        if (deletedReview) {

            res.json({
                message: "review deleted",
                data: planAfterDelete
            })

        }
        else {
            res.json({
                message: "review not found",

            })
        }
    }
    catch (err) {
        res.json({
            message: err.message
        })
    }
}