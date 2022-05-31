// This is your test secret API key.
const Sk = 'sk_test_51L3zO7SJNfG9J7jkywXByJFKT0b9NNqZ7QpQqgKxPpeG7CFCWpx9U6s1o2BMrUJl1FkrfBLpdbyZT7NISqa9LfTV00OzogJBLt'
const stripe = require('stripe')(Sk);
const planModel = require('../Models/planModel')
const userModel = require('../Models/userModel')

module.exports.createSession = async function createSession(req,res){
    try{
        let userId = req.id;
        let planId = req.params.id;

        const user = await userModel.findById(userId);
        const plan = await planModel.findById(planId);
        const session = await stripe.checkout.sessions.create({
          payment_method_types : ['card'],
          customer_email : user.email,
          client_reference_id : plan.id,
            line_items: [
              {
                name : plan.name,
                description : plan.description,
                amount : plan.price*100,
                currency : 'inr',
                quantity : 1
              },
            ],
            mode: 'payment',
            success_url: `${req.protocol}://${req.get('host')}/profile`,
            cancel_url: `${req.protocol}://${req.get('host')}/profile`,
          });
          res.status(200).json({
            Status : "Success",
            session
          })

    

    }
    catch(err){
        res.json({
            message : err.message
        })
    }

}




  