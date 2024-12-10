const express = require("express");
const connectToDb = require('./config/database');
const app = express();

const port = 4000;
app.use(express.json());
const { adminAuth, userAuth } = require("./middlewares/authMiddleware")
const User = require("./models/User")
const bcrypt = require('bcrypt');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const cookieParser = require("cookie-parser");
app.use(cookieParser());

const { validateData } = require('./utils/validations')



// console.log(connecttToDb());
connectToDb()
    .then(() => {
        console.log('Connected! to the Database Successfully!!!!!')
        app.listen(port, () => {
            console.log("Server is Started on port no: ", port)
        })
    })
    .catch((err) => {
        console.log(err)
    });





// app.get("/abc?d",(req,res)=>{
//     res.send({"name":"Akshat","surname":"Bharucha"});
// })


app.use("/admin", adminAuth);
// app.use("/user",userAuth)


app.post("/signup", async (req, res) => {
    // console.log(req.body)
    try {

        const { firstName, lastName, emailId
            , password } = req.body;

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

app.post("/login", async (req, res) => {

    try {
        const { emailId, password } = req.body;
        const s = validator.isEmail(emailId);
        const user = await User.findOne({ emailId: emailId });

        if (!user || !s) {
            throw new Error("Invalid Credentials or email")
        }

        const isValidPass = await bcrypt.compare(password, user.password);
        console.log(isValidPass);

        if (!isValidPass) {
            throw new Error("InCorrect Password")
        }
        else {

            const token = jwt.sign({_id:user._id},"1234",{ expiresIn: "2h" });
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

app.get("/profile", userAuth, async (req, res) => {

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
        const user =req.user;
        res.status(200).send("your Profile: "+ user);
    }
    catch (err) {
        // console.log(err)
        res.send("error: "+  err.message)

    }

})

app.post("/sendConnectionRequest", userAuth, async (req,res)=>{
    try{
        const reqSentBy = req.user;
        res.status(201).send("Request sent by: "+ reqSentBy.firstName);
    }
    catch(error){
        res.status(401).send("error occured: "+  error.message)
    }

})

app.get("/user", async (req, res) => {
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
app.get("/adminFind", async (req, res) => {
    // console.log(req.body.emailId);
    // const searchEmail = req.body.emailId;

    const id = req.body.id;

    try {
        const users = await User.findById({ _id: id })
        // console.log(users)
        if (!users) {
            res.status(404).send("No Users Present!!")
        }
        else {
            res.status(200).send(users)
        }

    }
    catch (err) {
        res.status(401).send(`something went wrong ${err}`)

    }
})
app.get("/feed", async (req, res) => {
    // console.log(req.body.emailId);
    // const searchEmail = req.body.emailId;

    try {
        const users = await User.find({})
        // console.log(users)
        if (!users) {
            res.status(404).send("No Users Present!!")
        }
        else {
            res.status(200).send(users)
        }

    }
    catch (err) {
        res.status(401).send(`something went wrong ${err}`)

    }
})

app.delete("/user", async (req, res) => {
    const userId = req.body.id;
    console.log(userId)
    try {
        const users = await User.findByIdAndDelete({ _id: userId });
        if (!users) {
            res.status(404).send("User Not Found!!")
        }
        else {
            res.status(200).send(users)
        }

    } catch (err) {

        res.status(401).send(`something went wrong ${err}`)

    }
})

app.patch("/userById", async (req, res) => {
    const userId = req.body.id;
    console.log(userId)
    try {
        const users = await User.findByIdAndUpdate({ _id: userId }, req.body);
        if (!users) {
            res.status(404).send("User Not Found!!")
        }
        else {
            res.status(200).send(users)
        }

    } catch (err) {
        res.status(401).send(`something went wrong ${err}`)
    }
})

app.patch("/userByEmail", async (req, res) => {
    const userId = req.body.emailId;
    console.log(userId)
    const allowedFields = ["firstName", "lastName", "age", "password", "gender", "photoUrl"]

    const isAllowedtoEdit = Object.keys(req.body).every((k) => allowedFields.includes(k));
    console.log(isAllowedtoEdit);
    if (!isAllowedtoEdit) {
        throw new Error("this Field Cannot be updated")
    }

    if (req.body?.length < 10) {
        throw new Error("Skills can't be more than 10")
    }
    try {
        const users = await User.findOneAndUpdate({ emailID: userId }, req.body);
        if (!users) {
            res.status(404).send("User Not Found!!")
        }
        else {
            res.status(200).send(users)
        }

    } catch (err) {
        res.status(401).send(`something went wrong ${err}`)
    }
})


// app.get("/admin/AllData",(req,res,next)=>[
//     res.send({"user":"Gaurav"})
// ])

// app.get("/admin",(req,res,next)=>[
//     res.send("Your are logged in Successfully as Admin")
// ])


app.get("/user", (req, res, next) => [
    res.send("Your are logged in Successfully as User")
])

app.get("/user/AllData", userAuth, (req, res, next) => [
    res.send({ "user": "Gaurav" })
])



app.get("/abcd/:name/:id/:age", (req, res) => {
    console.log(req.params)
    res.send({ "name": "Akshat", "surname": "Bharucha" });
})



app.get("/", (req, res, next) => {
    res.send("sent directly from regex")
})
app.get("/Route", (req, res, next) => {
    console.log("inside !st route handler");
    next();
    // res.send("Response 1")

}
)

app.get("/Route", (req, res, next) => {
    console.log("inside !st route handler");
    next();
    res.send("Response 1")
}
)





