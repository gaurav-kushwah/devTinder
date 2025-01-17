const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { now } = require("mongoose");


const adminAuth = (req, res, next) => {
   const token = "abc";
   adminAuthorization = token === "abc" ? true : false;
   if (!adminAuthorization) {
      res.status(401).send("Not authorized to be admin");
   }
   else {
      // res.status(200).send("You are authroized")
      console.log("you are admin auth");
      next();
   }
}


const userAuth = async (req, res, next) => {
   try {
      const {token} = req.cookies;
      if (!token) {
         throw new Error("token is not valid or not present!!!!!!!")
      }
      const tokenValid = await jwt.verify(token, "1234");
      const { _id } = tokenValid;
      const user = await User.findById(_id);

      if (!user) {
         throw new Error("User is not Present!!!");
      }
      console.log(user);

      req.user = user;
      next();


   }
   catch (error) {
      console.log("error: ", error);
      res.status(401).send("error occured: " + error.message)
   }
}

module.exports = ({
   adminAuth,
   userAuth
})