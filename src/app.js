const express = require("express");
const connectToDb = require('./config/database');
const app = express();

const port = 4000;
app.use(express.json());
const {adminAuth, userAuth} = require("./middlewares/authMiddleware")
const User = require("./models/User")


// console.log(connecttToDb());
connectToDb()
.then(() => {
    console.log('Connected! to the Database Successfully!!!!!')
    app.listen(port,()=>{
        console.log("Server is Started on port no: ", port)
    })
})
.catch((err) => {
    console.log(err)
});





// app.get("/abc?d",(req,res)=>{
//     res.send({"name":"Akshat","surname":"Bharucha"});
// })


app.use("/admin",adminAuth);
// app.use("/user",userAuth)


app.post("/signup",async (req,res)=>{

    const UserData = new User(req.body)
    console.log(req.body)

    try{
    await UserData.save();
    res.status(201).send("userCreated Succesfully")
    }
    catch(err){
        res.status(201).send("user has not been created", err.message)

    }
})



app.get("/admin/AllData",(req,res,next)=>[
    res.send({"user":"Gaurav"})
])

app.get("/admin",(req,res,next)=>[
    res.send("Your are logged in Successfully as Admin")
])


app.get("/user",(req,res,next)=>[
    res.send("Your are logged in Successfully as User")
])

app.get("/user/AllData",userAuth,(req,res,next)=>[
    res.send({"user":"Gaurav"})
])



app.get("/abcd/:name/:id/:age",(req,res)=>{
    console.log(req.params)
    res.send({"name":"Akshat","surname":"Bharucha"});
})



app.get("/",(req,res,next)=>{
    res.send("sent directly from regex")
})
app.get("/Route",(req,res,next)=>{
    console.log("inside !st route handler");
    next();
    // res.send("Response 1")

}
)

app.get("/Route",(req,res,next)=>{
    console.log("inside !st route handler");
    next();
    res.send("Response 1")
}
)






// app.use("",(req,res)=>{
//     res.send("Hey you got response from server");
// })  

//  // "" and "/" is the same case when it comes to extension
 
// app.use("/",(req,res)=>{
//     res.send("server is started on ............./.............")
// })