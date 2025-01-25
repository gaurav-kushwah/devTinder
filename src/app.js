const express = require("express");
const connectToDb = require('./config/database');
const app = express();

const port = 4000;

const cookieParser = require("cookie-parser");

app.use(cookieParser());
app.use(express.json());
const { userAuth } = require("./middlewares/authMiddleware");

const userAuthrouter = require('./routers/userauth');
const requestRouter = require('./routers/request');
const profileRouter = require('./routers/profile');
const userRouter = require('./routers/user')          

app.use('/',  userAuthrouter);
app.use('/', requestRouter);
app.use('/',profileRouter)
app.use('/', userRouter);




// console.log(connecttToDb());
connectToDb()
    .then(() => {
        console.log('Connected! to the Database Successfully!!!!!')
        app.listen(port, () => {
            console.log("Server is Started on port no: ", port)
        })
    })
    .catch((err) => {
        console.log(err)
    });





// app.get("/abc?d",(req,res)=>{
//     res.send({"name":"Akshat","surname":"Bharucha"});
// })


// app.use("/admin", adminAuth);
// app.use("/user",userAuth)













// app.get("/admin/AllData",(req,res,next)=>[
//     res.send({"user":"Gaurav"})
// ])

// app.get("/admin",(req,res,next)=>[
//     res.send("Your are logged in Successfully as Admin")
// ])






