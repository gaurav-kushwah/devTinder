const validator = require('validator');



function validateData(data){
    console.log("Data: ", data.body);
   const {firstName, lastName, emailId, password} = data.body;
   if(!firstName || !lastName){
    throw new Error("either firstName or LastName is not Valid");
   }
   else if (!validator.isEmail(emailId)){
    throw new Error("Please Enter a Valid Email")
   }
   else if(!validator.isStrongPassword(password)){
    throw new Error("Please enter a Strong Password")
   }
   
}


module.exports ={
    validateData
}


