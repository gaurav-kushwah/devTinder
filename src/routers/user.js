const  User = require("../models/User");

const {  userAuth } = require("../middlewares/authMiddleware");

const express = require("express");
// import { userAuth } from "../middlewares/authMiddleware";
// const app = express();
const userRouter =  express.Router();
const ConnectionRequestModel = require("../models/ConnectionRequest");



userRouter.get("/user/requests", userAuth, async (req,res)=>{
   try{
    const loggedInUserId = req.user._id;
    const ConnectionRequest = await ConnectionRequestModel.findOne({
        toUserId: loggedInUserId,
        status:'interested'
    }).populate("fromUserId",['firstName','lastName']);
    if(!ConnectionRequest){
        return res.status(401).send({message:"Connection Request Doesn't Exist "});
    }
    res.status(201).send({
        message:"data fetched Sucessfully",
        data: ConnectionRequest
    })
   }catch(error){
    return res.status(401).send({message:`error ${error.message}`})
   } 
})

const USER_SAFE_DATA ='firstName lastName photoUrl age gender about skills' 
userRouter.get("/user/connections", userAuth, async (req,res)=>{
    try{
        const loggedInUser = req.user;
        const connectionRequest = await ConnectionRequestModel.find({
            $or:[
                {fromUserId:loggedInUser._id, status:"accepted"},
                {toUserId:loggedInUser._id, status:"accepted"}
            ],
        }).populate("fromUserId", USER_SAFE_DATA).
        populate("toUserId", USER_SAFE_DATA)

        const data = connectionRequest.map((row)=>{
            if(row.fromUserId === loggedInUser._id){
                return row.toUserId
            }
            return row.fromUserId
        })
         console.log("sample",data)
        res.status(201).json(data);

    }
    catch(error){
        console.log(error);
        res.status(401).send({message:"The Following error has been sent " + error.message})

    }

})


userRouter.get("/user/feed", userAuth, async (req,res)=>{
try{ 

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip  = (page-1)*limit;

    limit = limit>50?50:limit;

    const loggedInUserId = req.user;

    const ConnectionRequest = await ConnectionRequestModel.find({
        $or:[ {fromUserId:loggedInUserId}
            ,{ toUserId:loggedInUserId}
        ]
    }).select("fromUserId toUserId")
    const hiddenProfilesSet = new Set();
    // const hiddenObj={};
    ConnectionRequest.forEach((values)=>{
        hiddenProfilesSet.add(values.fromUserId.toString());
        hiddenProfilesSet.add(values.toUserId.toString());
    })
    const Users = await User.find({
        $and : [
        {_id:{ $nin : Array.from(hiddenProfilesSet)}},
        {_id :{ $ne: loggedInUserId._id}}
        ]
    }).select(USER_SAFE_DATA).skip(skip).limit(limit);
    console.log(Array.from(hiddenProfilesSet));
    res.status(201).send(`Users all interactions ${Users}`)

    }
    catch(error){
        res.status(401).send(`error: ${error.message}`)
    }
})




module.exports = userRouter;