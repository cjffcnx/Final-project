const mongoose=require('mongoose');
const colors=require('colors');
const connectDB=async ()=>{
   try{
await mongoose.connect(process.env.MONGO_URL);
console.log(`Connected to MONGODB database ${mongoose.connection.host} successfully`)

   }
   catch(err){  
       console.log(`Error in MongoDB connection: ${err.message}`.bgRed.white);
   }
}

module.exports=connectDB;