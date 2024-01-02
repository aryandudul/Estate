import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String ,
        required: true ,
        unique: true,
    },
    email: {
        type: String ,
        required: true ,
        unique: true,
    },
    hashedPassword: {
        type: String ,
        required: true ,
        
    },
    avatar: {
        type: String,
        default: "https://www.example.com/default-avatar.jpg", // Replace with a direct link to your default avatar image
    }

}, {timestamps: true }) ;

const User= mongoose.model('User' , userSchema) ;
export default User ;
