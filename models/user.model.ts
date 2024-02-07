import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        lowercase: true,
        trim: true
    },
    lastName:{
        type:String,
        required:true,
        lowercase: true,
        trim: true
    },
    username:{
        type:String,
        required:true,
        unique:true,
        lowercase: true,
        trim: true,
        index: true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase: true,
        trim: true,
        index: true
    },
    password:{
        type:String,
        required:[true, "Password is required"],
        minlength:6,
    },
    gender:{
        type:String,
        required:true,
        enum:["male","female"]
    },
    avatar: {
        type: String, //cloudinary url
        required: true,
    },
    loginType:{
        type: String,
        required:true,
        enum:["email","google","facebook","github"]
    }
},
{
    timestamps:true
})

export const User = mongoose.model("User",userSchema);