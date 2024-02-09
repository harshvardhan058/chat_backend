import express from "express";
import protectRoute from "../middlewares/protectRoute.middleware";
import { getMessage, sendMessage } from "../controllers/message.controller";

const router = express.Router();

// Protected Route
router.route("/:id").get(protectRoute,getMessage);
router.route("/send/:id").post(protectRoute,sendMessage);

export default router;