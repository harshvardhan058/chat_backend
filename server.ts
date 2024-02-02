import express,{Express,Request,Response} from "express";
import dotenv from "dotenv";
import { authRouter } from "./routes";

dotenv.config();

const app:Express = express();
const PORT = process.env.PORT || 5000;

app.get("/",(req:Request,res:Response)=>{
    res.send('Express + TypeScript Server');
})

app.use("/api/auth",authRouter)

app.listen(PORT,()=>{
    console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`)
})