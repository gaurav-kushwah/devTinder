const express = require('express');
// const app = express();
const requestRouter = express.Router();
const User = require("../models/User");
const {  userAuth } = require("../middlewares/authMiddleware");
const connectionRequestModel = require('../models/ConnectionRequest');




requestRouter.post("/sendConnectionRequest/sent/:status/:toUserId", userAuth, async (req,res)=>{
    try{
        // const reqSentBy = req.user;
        const fromUserId  = req.user._id;
        const toUserId = req.params.toUserId;
        const status  = req.params.status;

        const validStatus=['interested','ignored','accepted','rejected'];

        if(!validStatus.includes(status)){
            return res.status(401).send({message:"Invalid Status choosen "})
        }

        const toUser = await User.findById(toUserId)
        if(!toUser){
            return res.status(401).send({message:"User does not exist "})
   
        }

        const existingConnectionRequest =await connectionRequestModel.findOne({
            $or:[
                {fromUserId,toUserId},
                {fromUserId:toUserId,toUserId:fromUserId}
            ]
        })

        if(existingConnectionRequest){
            return res.status(401).send({message:"Connection Request ALreadyExist "})
        }


        const connectionRequest = new connectionRequestModel({
            fromUserId,
            toUserId,
            status
        });

        const data = await connectionRequest.save();
        res.status(201).send("Request sent by: "+ data);
    }
    catch(error){
        res.status(401).send("error occured: "+  error.message)
    }

})


requestRouter.post("/sendConnectionRequest/review/:status/:requestId",userAuth, async (req,res)=>{
    try{
      
        const loggedInUserId =req.user._id;
        const {status,requestId} =req.params;

        const allowedStatus = ['accepted','rejected'];

        if(!allowedStatus.includes(status)){
            return res.status(401).send({message:"Invalid Status choosen "});
        }
        console.log(loggedInUserId);
        // console.lgo()
        const connectionRequest = await connectionRequestModel.findOne({
            _id:requestId,
            toUserId:loggedInUserId,
            status:'interested'
        })

        if(!connectionRequest){
            return res.status(401).send({message:"Connection Request Doesn't Exist "});
        }
        connectionRequest.status = status;
        const data = await connectionRequest.save()
        return res.status(200).send({message: `You have ${status} this request`});
    }
    catch(err){
        res.status(401).send("error occured: "+  err.message)
    }

})

module.exports =requestRouter;