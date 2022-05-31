const { json } = require('body-parser');
const express = require('express');
const cookieParser = require("cookie-parser")
const app = express();
app.use(cookieParser())

//middleware function used int post..convert data from frontend into json
app.use(express.json())  //global

app.listen(3000);

const userRouter = require('./Routers/userRouter');
const planRouter = require("./Routers/planRouter");
const reviewRouter = require("./Routers/reviewRouter")
const bookingRouter = require("./Routers/bookingRouter")
//const authRouter = require('./Routers/authRouter');
app.use('/user', userRouter)
app.use('/plans',planRouter)
app.use('/reviews',reviewRouter)
app.use('/booking',bookingRouter)
//app.use('/auth', authRouter)

















