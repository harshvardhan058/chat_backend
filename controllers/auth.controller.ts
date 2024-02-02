import { Request,Response } from "express";
export const loginUser = (req:Request,res:Response) => {
    res.send("Login user Through Login Controller")
}

export const signupUser = (req:Request,res:Response) => {
    res.send("Signup user Through Login Controller")
}

export const logoutUser = (req:Request,res:Response) => {
    res.send("Logout user Through Login Controller")
}