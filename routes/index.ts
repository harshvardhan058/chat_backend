import authRouter from "./auth.routes";
import messageRouter from "./message.routes"
import userRouter from "./user.routes"
import express from "express";

const router = express.Router();

router.use("/auth",authRouter);
router.use("/messages",messageRouter);
router.use("/users",userRouter);

export default router;