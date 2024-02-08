import express from "express";
import { loginUser, logoutUser, signupUser } from "../controllers/auth.controller";
import { upload } from "../middlewares/multer.middleware";
import { verifyJWT } from "../middlewares/auth.middleware";

const router = express.Router();

// public Route
router.route("/signup").post(upload.single("avatar"),signupUser);
router.route("/login").post(loginUser);

// Protected Route
router.route("/logout").post(verifyJWT,logoutUser);

export default router;