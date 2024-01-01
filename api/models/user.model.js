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
    avatar:{
        type: String,
        default: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.vecteezy.com%2Ffree-vector%2Fdefault-profile-picture&psig=AOvVaw3PZmS_vD1ox81HryuRPEFu&ust=1704221026856000&source=images&cd=vfe&ved=0CBIQjRxqFwoTCKjQoaTsvIMDFQAAAAAdAAAAABAE"
    }

}, {timestamps: true }) ;

const User= mongoose.model('User' , userSchema) ;
export default User ;
