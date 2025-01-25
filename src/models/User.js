const mongoose = require('mongoose');
const validatorLib = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String
    },
    emailId: {
        type: String,
        required: true,
        unique: true,
        immutable: true,
        validator(value) {
            if (!validatorLib.isEmail(value)) {
                throw new Error("Email is not Valid:    ")
            }
        }
    },
    password: {
        type: String,
        required: true
    },
    age: {
        type: Number
    },
    gender: {
        type: String,
        validate: agevalidator
    },
    photoUrl: {
        type: String,
        default: "https://geographyandyou.com/images/user-profile.png",
    },
    about: {
        type: String,
        default: "This is a default about of the user!"
    }
}, { strict: true, timestamps: true },);

userSchema.methods.getJWT = async function () {
    const user = this;
    const token = await jwt.sign({_id:user._id},"1234",{ expiresIn: "2h" });
    return token;
}


userSchema.methods.validatePasswords = async function (userEnteredPass) {
    const user = this;
    const dbPassHash = user.password;
    const isValidPass = await bcrypt.compare(userEnteredPass, dbPassHash); 
    return isValidPass;
}

function agevalidator(value) {
    if (!["Male", "Female", "Others"].includes(value)) {
        throw new Error("Gender is not Valid::::::  ")
    }

}

const User = mongoose.model("User", userSchema);

module.exports = User;