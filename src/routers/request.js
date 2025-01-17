const express = require('express');
// const app = express();
const requestRouter = express.Router();
const User = require("../models/User");
const {  userAuth } = require("../middlewares/authMiddleware");




requestRouter.post("/sendConnectionRequest", userAuth, async (req,res)=>{
    try{
        const reqSentBy = req.user;
        res.status(201).send("Request sent by: "+ reqSentBy.firstName);
    }
    catch(error){
        res.status(401).send("error occured: "+  error.message)
    }

})

module.exports =requestRouter;