 <-----------------------> Video 3 homework ---> 
 - create a repositry
 - Initalize the repositry
 - node modulues, package.json, package-lock.json
 - Install Express Lbrary
 - create a server
 - Listen to port 7777
 - Write  request handler for /test , /hello
 - install nodemon and update the scripts
 - what are dependencies
 - use of -g command
 - difference between caret anf tilde





 Homework video 4 -: 

 -play with route and route handlers extensions - ./hello, /test,/hello2,/,/xyz

 tip ----> order of routes matter a lot


 - Install Postman app and make a workspace/collections  ==> test api calls 


 - Write logic to handle Get, Post, Patch, Delete API calls and test them on Postman 
 -query params



 -body query

 -use of ?, + , * regex    




 // Multiple route Handlers -- play with the code 

 -- next()
 -- next funvtion and errors along with the res.send
 -- app.use("/route",[ph1, ph2],ph3,ph4,ph5)

<--------------------------MiddleWare------------------------->


 ----what is middleware documentation reading 
 -----how express.js basicallyy handles request behind the scenes 
 ----- why do we need middleware 
 ----difference between app.use and app.all (read from documentation)
 ----Write a dummy auth middleware for admin
 ----write a dummy auth middleware for user router except login







 <----------------------Database Schema, database Design ---------------------------->



----- Create a free cluster on MongoDB Official Website
----Installing mongoose Library
----- Connect your application to your mongo Db Compass and atlas
----- adding after <ConnectionURL>/devTinder after your cluster
--- Call the connect DB function before starting application 0n Port 4000






---- crate a userSchema and userModel
---create  a  post signup APi call to add data to database
---push some documents using API Calls from postman 
--



--js Object vs json Differences
-- Add the express.json middleware to your app
-- make your journey API dynamic to recieve data from the end user
--User.findOne with duplicate emailids, which object returned
--APi -get user by email
--API - feed AAPI - GET/feed - get all the user from the database  
--API - GET USER by ID function of mongoose

--API - update a user using mngo DB Id
-- API - delete a user
-- Explore the mongoose documentation for mmodl API anf Functions
-- options are in model.findoneandupdate

-- API - update a user using email
 

 --explore SchemaTypes options from the documentation
 -- and required , uniquue, lowercase, min, minlength, trim
 --- add default
 --create a custom validate function for gennder
 -- Improve the DB schema -- pit all appropriate Validations on each field in Schema
 -- Add Timestamps in the userSchema

 --Add API Level validations functions for gender
 -- Data Sanitizing  - Add API validation for each API
 -- install validator library
 -- explore validator library function and Use
 -- never trust req.body -- use params



 --- validate data in singupAPI
 --- install brcypt package
 --- create password hash using bcrypt.hash and save the user is encrypted password


 // install Jwt token // install cookie parser

 // send a dummy cookie
 // creaste a get porfile api get a cookie back or not

 //read from profile api 
 // In Login Api, after email and password validation create a jwt token and send it back to theuser in cookies 
 // read the cookies inside your profile api and find the logged in user


 -- write you user auth middleware
 -- ad the user auth ,iddleware in profile api and a new send connection api connection request

 -- set the expirty of the JWT token and cookie to 7 dayws

 

  
 




