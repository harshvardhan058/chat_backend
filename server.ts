import express,{Express,Request,Response} from "express";
import dotenv from "dotenv";
import restRouter from "./routes";
import connectDB from "./db";
import cookieParser from "cookie-parser";
import session from "express-session";
import path from "path"
import passport from "passport";
import cors from "cors"

dotenv.config({
    path:"./.env"
});

const app:Express = express();
const PORT = process.env.PORT || 5000;
app.on("error",(error)=>{
    console.log("Error",error)
})

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials:true
}))
app.use(express.json({ limit: "1mb" }))
app.use(express.urlencoded({ extended: true, limit: "16kb" }))
app.use(express.static(path.join(__dirname,"public")))
app.use(cookieParser())
app.use(session({
    secret:"dhbsahsadbuehduhaudbhsdbal",
    saveUninitialized: true,
    resave:true
}))
// app.use(passport.initialize())
// app.use(passport.session())
app.get("/",(req:Request,res:Response)=>{
    res.send('Express + TypeScript Server');
})

app.use("/api/v1",restRouter)

connectDB().then(()=>{
    app.listen(PORT,()=>{
        console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`)
        console.log(`Server is running on processId ${process.pid}`)
    })
})
.catch((error)=>{
    console.log(`Database Connection Failed!! ${error}`)
})