import express from "express";
import protectRoute from "../middlewares/protectRoute.middleware";
import { getUsersForSidebar } from "../controllers/user.controller";

const router = express.Router();

// Protected Route
router.route("/").get(protectRoute,getUsersForSidebar);

export default router;