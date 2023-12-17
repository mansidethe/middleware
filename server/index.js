import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(express.json());



let counter =0;
const apiCallCounter = (req,res,next)=>{
    counter++;
    console.log(`API Calls:${counter}`)
    next();
}
app.use(apiCallCounter)


const connectDB = async () => {
        const conn = await mongoose.connect(process.env.MONGODB_URI)
    if (conn) {
        console.log('MongoDB Connected...');
    }
    
};
connectDB();

app.get('/',(req,res)=>{
    res.send('hello world');
});

 const checkApi =(req,res, next)=>{
    const {apiKey} = req.query;

    if (apiKey==="bharti1208"){
        next();
    }
    else{
        return res.status(401).json({
            success:false,
            message:'Api Key is Invalid'
        })
    }

 }
 const validateParams =(req,res,next)=>{
    const {title,description,price}= req.body

    if(!title){
        return res.json({
            success:true,
            message:'title is missing'
        })
    }
    if(!description){
        return res.json({
            success:true,
            message:'description is missing'
        })
    }

    if(!price){
        return res.json({
            success:true,
            message:'price is missing'
        })
    }
    next();

   
 }
 app.post("/orders",checkApi,validateParams,async(req,res)=>{
    res.json({
        success:true,
        data:{},
        message:'Order is Created'
    })
 })
 app.get("/orders",checkApi,async(req,res)=>{
    res.json({
        success:true,
        data:[],
        messsage:'Orders is fetched successfully'

    })
 })

 const PORT = process.env.PORT || 5000;
 app.listen(PORT, () => {
     console.log(`Server runniong on port ${PORT}`)
})