const express=require('express');
const dotenv=require('dotenv');
const colors=require('colors');
const morgan=require('morgan');
const cors=require('cors');


// dot env config
dotenv.config();
//rest object express ko sabai functionality app ma store xa
const app=express();

// configuration in the middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(morgan('dev'));


//test route
app.use('/api/v1/test',require('./routes/testRoute'))
//get takes path and callback function, callback has request response and middleware

app.get('/',(req,res)=>{
res.status(200).json({
message:"Hello from the homepage of Blood Bank App"
})
})

const PORT=process.env.PORT || 8080;

app.listen(PORT,(req,res)=>{
    console.log(`server is running at port ${PORT}`);   
})