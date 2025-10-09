const { registerController, loginController, currentUserController } = require("../controller/authController");

const express=require("express");
const authMiddleware = require("../middlewares/authMiddleware");

// Creating a router object
const router=express.Router();

//Defining the route
//REGISTER || POST
router.post('/register',registerController);


//LOGIN || POST
router.post('/login',loginController);

//GET CURRENT USER || GET
router.get('/current-user',authMiddleware,currentUserController);

// Exporting the router
module.exports=router;