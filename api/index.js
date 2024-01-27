import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import cookieParser from 'cookie-parser' ;

dotenv.config();
mongoose.connect(process.env.Mongo).then(() => {
    console.log("Connected to MongoDB");
}).catch((error) => {
    console.error("MongoDB connection error:", error);
});

const app = express();

// Apply express.json() middleware
app.use(express.json());
app.use(cookieParser());

// Set up routes
app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);


app.use((err , req , res , next) =>{
    const statusCode= err.statusCode || 500;
    const message = err.message || 'Internal server Error' ;
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,

    }) ;
});

app.listen(3000, () => {
    console.log('Server is running on port number 3000');
});
