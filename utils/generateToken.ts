import jwt, { Secret } from "jsonwebtoken";
import {Response} from "express"
import mongoose from "mongoose";

const generateTokenAndSetCookie = (userId:mongoose.Types.ObjectId,res:Response) => {
    const token = jwt.sign({userId},process.env.JWT_SECRET as Secret,{
        expiresIn:"15d"
    })

    res.cookie("jwt",token,{
        maxAge: 15 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict"
    })
}

export default generateTokenAndSetCookie