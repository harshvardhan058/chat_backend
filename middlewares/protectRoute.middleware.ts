import jwt,{JwtPayload, Secret} from "jsonwebtoken";
import { User } from "../models/user.model";
import {Request,Response,NextFunction} from "express"

const protectRoute = async (req:Request, res:Response, next:NextFunction) => {
	try {
		const token = req.cookies.jwt;

		if (!token) {
			return res.status(401).json({ error: "Unauthorized - No Token Provided" });
		}

		const decoded = jwt.verify(token, process.env.JWT_SECRET as Secret) as JwtPayload;

		if (!decoded) {
			return res.status(401).json({ error: "Unauthorized - Invalid Token" });
		}

		const user = await User.findById(decoded.userId).select("-password");

		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

		req.user = user;

		next();
	} catch (error:any) {
		console.error("Error in protectRoute middleware: ", error.message);
		return res.status(500).json({ error: "Internal server error" });
	}
};

export default protectRoute;