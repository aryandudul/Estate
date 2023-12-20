import express from  'express' ;
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config() ;
mongoose.connect(process.env.Mongo).then( ()=>{
    console.log("Connected");
});

const app = express() ;

app.listen(3000 , () =>{
    console.log('Server is Running on port number 3000');
});