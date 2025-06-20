const express = require('express');

const profileRouter = express.Router();
const User = require("../models/User");
const { userAuth } = require("../middlewares/authMiddleware");



profileRouter.get("/profile", userAuth, async (req, res) => {

    try {
        // const cookies = req.cookies;
        // const { token } = cookies;

        // if(!token){
        //     throw new Error("Token is not valid")
        // }

        // const tokeValid = await jwt.verify(token, "1234")
        // console.log(tokeValid);
        // const {_id} = tokeValid;
        // const jwtUser = await  User.findById(_id);

        // if(!jwtUser){
        //     throw new Error("User not Found");
        // }
        // console.log("user: ", jwtUser);
        const user = req.user;
        res.status(200).send("your Profile: " + user);
    }
    catch (err) {
        // console.log(err)
        res.send("error: " + err.message)

    }

})

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {

    try {

        const editableFields = ['firstName', 'lastName', 'about', 'age', 'gender'];

        // const user = await user.findOne("")?

        const isEditedAllowed = Object.keys(req.body).every((field) => editableFields.includes(field));

        if (!isEditedAllowed) {
            throw new Error("Invalid field or field cannot be editable")
        }
        else {
            console.log(req.user);
            const loggedInUser = req.user;

            Object.keys(req.body).forEach((field) => loggedInUser[field] = req.body[field]);
            res.status(201).send(`${loggedInUser.firstName} your profile has successfully updated`);

        }

    }

    catch (err) {
        console.log("err: ", err.message);
    }

})


profileRouter.get("/user", async (req, res) => {
    console.log(req.body.emailId);
    const searchEmail = req.body.emailId;

    try {
        const users = await User.findOne({ emailId: searchEmail })
        // console.log(users)
        if (!users) {
            res.status(404).send("User Not Found!!")
        }
        else {
            res.status(200).send(users)
        }

    }
    catch (err) {
        res.status(401).send(`something went wrong ${err}`)

    }
})



module.exports = profileRouter;