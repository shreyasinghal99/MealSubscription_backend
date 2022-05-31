const express = require('express');

const reviewRouter = express.Router();
const { protectRoute, isAuthorised } = require('../Controller/authController');

const {getAllReviews,getTop3Reviews,getPlansReviews,createReview,updateReview,deleteReview} = require("../Controller/reviewController")
reviewRouter.route("/allreviews")
.get(getAllReviews)

reviewRouter.route('/top3reviews')
.get(getTop3Reviews)

reviewRouter.route('/:id')
.get(getPlansReviews)

reviewRouter.use(protectRoute)
reviewRouter.route('/crud/:plan')
.post(createReview)
.patch(updateReview)
.delete(deleteReview)


module.exports = reviewRouter;

