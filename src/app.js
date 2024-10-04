const express = require("express");

const app = express();

const port = 4000;

app.listen(port,()=>{
    console.log("Server is Started on port no: ", port)

})


// app.get("/abc?d",(req,res)=>{
//     res.send({"name":"Akshat","surname":"Bharucha"});
// })



app.get("/abcd/:name/:id/:age",(req,res)=>{
    console.log(req.params)
    res.send({"name":"Akshat","surname":"Bharucha"});
})




app.use("/Route",(req,res,next)=>{
    console.log("inside !st route handler");
    next();
    // res.send("Response 1")

}
,
(req,res,next)=>{
    console.log("inside 2st route handler");
    next();
    // res.send("Response 2")
},
(req,res,next)=>{
    console.log("inside 3rd route handler");
    // res.send("Response 3")
    next();
},[
(req,res,next)=>{
    console.log("inside 4th route handler");
    // res.send("Response 2")
    next();
},
(req,res,next)=>{
    console.log("inside 5th route handler");
    res.send("Response 5")
}]
)






// app.use("",(req,res)=>{
//     res.send("Hey you got response from server");
// })  

//  // "" and "/" is the same case when it comes to extension
 
// app.use("/",(req,res)=>{
//     res.send("server is started on ............./.............")
// })