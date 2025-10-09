const mongoose=require('mongoose');

const inventoryModel=new mongoose.Schema({
inventoryType:{
    type:String,
    required:[true, 'Inventory type required'],
    enum:['in','out']
},
bloodGroup:{
    type:String,
    required:[true,'Blood group is required'],
    enum:['A+','A-','B+','B-','AB+','AB-','O+','O-']
},
quantity:{
    type:Number,
    required:[true,'Blood Quantity is required']
},

organisation:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'users',
    required:[true,'Organisation is required']
},
hospital:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'users',
    required: function(){
        return this.inventoryType==='out';
    }
},
donar:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'users',
    required: function(){
        return this.inventoryType==='in';
    }
    }

},{timestamps:true});

module.exports=mongoose.model('Inventory',inventoryModel);
