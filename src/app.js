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






// app.use("",(req,res)=>{
//     res.send("Hey you got response from server");
// })  

//  // "" and "/" is the same case when it comes to extension
 
// app.use("/",(req,res)=>{
//     res.send("server is started on ............./.............")
// })