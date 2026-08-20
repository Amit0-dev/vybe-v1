import express from "express";
import { generateMagicLink, getUserInfo, verifyLink } from "../controllers/user.controller.js";
import { asyncHandler } from "../utils/async-handler.js";
import { requireAuth } from "../middleware/auth.middleware.js";

const userRoutes = express.Router();

userRoutes.post("/", asyncHandler(generateMagicLink));
userRoutes.get("/authenticate", asyncHandler(verifyLink));
userRoutes.get("/info", asyncHandler(requireAuth), asyncHandler(getUserInfo));

export default userRoutes;