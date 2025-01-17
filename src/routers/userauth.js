const express = require('express');
const app = express();
const userAuthrouter = express.Router();


const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const validator = require('validator');




const { validateData } = require('../utils/validations');

const User = require("../models/User");



userAuthrouter.post("/signup", async (req, res) => {
    // console.log(req.body)
    try {

        const { firstName, 
            lastName, 
            emailId
            , password }
             = req.body;

        // validation for checking the Data
        validateData(req);

        // Encrypting the password for Data
        const encryptedPass = await bcrypt.hash(password, 10);
        console.log(encryptedPass);
        const UserData = new User({
            firstName,
            lastName,
            emailId,
            password: encryptedPass,
        })
        await UserData.save();
        res.status(201).send("userCreated Succesfully")
    }
    catch (err) {
        res.status(400).send("user has not been created" + err.message)

    }
})

userAuthrouter.post("/login", async (req, res) => {

    try {
        const { emailId, password } = req.body;
        const s = validator.isEmail(emailId);
        const user = await User.findOne({ emailId: emailId });

        if (!user || !s) {
            throw new Error("Invalid Credentials or email")
        }

        const isValidPass = await user.validatePasswords(password);
        console.log("x",isValidPass);

        if (!isValidPass) {
            throw new Error("InCorrect Password")
        }
        else {

            const token = await user.getJWT();
            console.log(token);
            res.cookie("token", token, { expires: new Date(Date.now() + 60000), httpOnly: true })
            // validate a JWT rtoken

            res.status(200).send("SUccessfully logged in")
        }

    }
    catch (err) {
        console.log("error: ", err)
        res.status(400).send("user has not been created" + err.message)
    }

}) 

userAuthrouter.post('/logout', async (req,res)=>{
    try{
        res.cookie("token"
            ,null,{
                expires:new Date(Date.now()),
            }
        )
        res.status(200).send('logout successful')

    }
    catch(err){

    }

})

userAuthrouter.patch('/resetPassword', async(req,res)=>{
    try{

        const {
            emailId, password, newpassword}= req.body;

            console.log(req.body);
        const emailExist = await User.findOne({emailId:emailId});
        console.log(emailExist);
        const isValidPass = await  emailExist.validatePasswords(password);
        console.log(isValidPass);
        const newPasshash = await bcrypt.hash(newpassword,10);
          emailExist.password = newPasshash;
          await emailExist.save();
        if(!emailExist || !isValidPass){
            throw new Error("password or email is not correct");
        }
        res.status(201).send("userRead sucessfullly");
    }
    catch(err){
        console.log("err: ", err);
        res.send("userRead unsucessfullly error: ", err);
    }
})







module.exports = userAuthrouter;