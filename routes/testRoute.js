const express=require("express");
const { testController } = require("../controller/testController");

// router object bas router ko functionality variable ma store garne
const router=express.Router();

//router ko use garera aba hami routing garxam
router.get('/',testController);

//es5 lai export garna

// yesle ke hunxa jati pani hami future ma route create garxum tyo automatically router export garidinxa
module.exports=router;