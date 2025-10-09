const inventoryModel = require("../model/inventoryModel");
const userModel = require("../model/userModel");

const createInventoryController=async (req,res)=>{

    try{
const {email,inventoryType}=req.body

// Validation of we receive the user or not

const user=await userModel.findOne  ({email});

if(!user){
 throw new Error("User not found");
}

if(inventoryType=== 'in' && user.role !=='donar')
{
  throw new Error("Not a donar account");
}

if(inventoryType==='out' && user.role !=='hospital'){
  throw new Error("Not a receiver account");
}

const inventory=new inventoryModel(req.body)
await inventory.save();

return res.status(201).send({
    success:true,
    message:"New Blood Record Added"
})

    }catch(error){  
        console.log(error);

        res.status(500).send({
            success: false,
            message: "Error in the create inventory api",
            error
        })
    }
}

module.exports={createInventoryController}