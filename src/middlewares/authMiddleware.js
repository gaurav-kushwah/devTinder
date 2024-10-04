


const adminAuth = (req,res,next)=>{
    const token = "abc";
    adminAuthorization  = token ==="abc" ?true:false;
    if(!adminAuthorization){
       res.status(401).send("Not authorized to be admin");
    }
    else{
       // res.status(200).send("You are authroized")
      console.log("you are admin auth");
      next();
   }
}
   

   const userAuth = (req,res,next)=>{
    const token = "xyz";
    adminAuthorization  = token ==="xyz" ?true:false;
    if(!adminAuthorization){
       res.status(401).send("Not authorized to be admin");
    }
    else{
       // res.status(200).send("You are authroized")
      console.log("you are user auth");
      next();
   }
}

   module.exports=({
    adminAuth,
    userAuth
   })