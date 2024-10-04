const express = require("express");

const app = express();

const port = 4000;

const {adminAuth, userAuth} = require("./middlewares/authMiddleware")

app.listen(port,()=>{
    console.log("Server is Started on port no: ", port)

})


// app.get("/abc?d",(req,res)=>{
//     res.send({"name":"Akshat","surname":"Bharucha"});
// })


app.use("/admin",adminAuth);
// app.use("/user",userAuth)



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