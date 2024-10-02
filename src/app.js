const express = require("express");

const app = express();

const port = 4000;

app.listen(port,()=>{
    console.log("Server is Started on port no: ", port)

})


app.get("/user",(req,res)=>{
    res.send({"name":Akshat,"surname":Bharucha});
})


app.post("/user",(req,res)=>{
    res.send("User Created Successfully");
})



app.put("/user",(req,res)=>{
    res.send("User updated Successfully");
})


app.delete("/user",(req,res)=>{
    res.send("User deleted Successfully");
})





app.use("",(req,res)=>{
    res.send("Hey you got response from server");
})  

 // "" and "/" is the same case when it comes to extension
 
app.use("/",(req,res)=>{
    res.send("server is started on ............./.............")
})