const mongoose = require('mongoose');
const validatorLib = require('validator');
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
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

function agevalidator(value) {
    if (!["Male", "Female", "Others"].includes(value)) {
        throw new Error("Gender is not Valid::::::  ")
    }

}

const User = mongoose.model("User", userSchema);

module.exports = User;