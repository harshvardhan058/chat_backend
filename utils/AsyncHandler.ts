import {Request,Response,RequestHandler,NextFunction} from "express"
const asyncHandler = (requestHandler:RequestHandler)=>{
    return (req:Request,res:Response,next:NextFunction)=>{
        Promise.resolve(requestHandler(req,res,next)).catch((error)=>next(error))
    }
}

export{asyncHandler}