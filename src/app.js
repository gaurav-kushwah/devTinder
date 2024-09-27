const express = require("express");

const app = express();

const port = 4000;

app.listen(port,()=>{
    console.log("Server is Started on port no: ", port)

})

app.use((req,res)=>{
    res.send("Hey you got response from server");
})