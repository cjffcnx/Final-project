const { registerController, loginController } = require("../controller/authController");

const express=require("express");

// Creating a router object
const router=express.Router();

//Defining the route
//REGISTER || POST
router.post('/register',registerController);


//LOGIN || POST
router.post('/login',loginController);
// Exporting the router
module.exports=router;