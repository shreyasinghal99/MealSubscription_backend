const express = require('express');
const { protectRoute, isAuthorised } = require('../Controller/authController');

const planRouter = express.Router();
const {getAllPlans,getPlan,createPlan,deletePlan,updatePlan,getTop3Plans} = require('../Controller/planController')
planRouter.route('/allPlans')
.get(getAllPlans)



//loggedIn user plan
planRouter.use(protectRoute)
planRouter.route('/plan/:id')
.get(getPlan)


//only admin and rest.owners can do crud ops
planRouter.use(isAuthorised(['admin','restaurantOwner']))
planRouter.route('/crudPlan')
.post(createPlan)

planRouter.route('/crudPlan/:id')
.patch(updatePlan)
.delete(deletePlan)


planRouter.route('/top3plans')
.get(getTop3Plans)


module.exports = planRouter