import { Request,Response } from "express";
import { User } from "../models/user.model";
import bcrypt from "bcryptjs"
import generateTokenAndSetCookie from "../utils/generateToken";

export const signupUser = async (req:Request,res:Response) => {
    try {
        const {fullName,username,password,gender,confirmPassword} = req.body;

        if(password !== confirmPassword){
            return res.status(400).json({error:"Passwords Don't Match"})
        }

        const user = await User.findOne({username})

        if(user){
            return res.status(400).json({error:"Username Already Exists"})
        }

        const profilePic = `https://api.dicebear.com/7.x/lorelei/svg?seed=${username}`;

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt)
        const newUser = new User({
            fullName,
            username,
            password:hashedPassword,
            gender,
            profilePic
        })

        if (newUser){
            generateTokenAndSetCookie(newUser._id,res)
            await newUser.save()
            return res.status(201).json({
                _id:newUser._id,
                fullName:newUser.fullName,
                username:newUser.username,
                gender:newUser.gender,
                profilePic:newUser.profilePic
            })
        }else{
            return res.status(400).json({
                error:"Invalid user Data"
            })
        }

        
    } catch (error: any) {
        console.error("Error in Auth Signup Controller",error.message);
        return res.status(500).json({
            error:"Internal Server Error"
        })
    }
}

export const loginUser = async (req:Request,res:Response) => {
    try {
        const {username,password} = req.body;
        const user = await User.findOne({username});
        const isPasswordCorrect = await bcrypt.compare(password,user?.password || "")

        if(!user || !isPasswordCorrect){
            return res.status(400).json({error:"Invalid Credentials"})
        }

        generateTokenAndSetCookie(user._id,res);

        return res.status(200).json({
            _id:user._id,
            fullName:user.fullName,
            username:user.username,
            gender:user.gender,
            profilePic:user.profilePic
        })
    } catch (error: any) {
        console.error("Error in Auth Login Controller",error.message);
        return res.status(500).json({
            error:"Internal Server Error"
        })
    }
}

export const logoutUser = (req:Request,res:Response) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
		res.status(200).json({ message: "Logged out successfully" });
    } catch (error: any) {
        console.error("Error in Auth Login Controller",error.message);
        return res.status(500).json({
            error:"Internal Server Error"
        })
    }
}