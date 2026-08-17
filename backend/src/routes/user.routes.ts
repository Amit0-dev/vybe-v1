import express from "express";
import { generateMagicLink, getUserInfo, verifyLink } from "../controllers/user.controller";
import { asyncHandler } from "../utils/async-handler";
import { requireAuth } from "../middleware/auth.middleware";

const userRoutes = express.Router();

userRoutes.post("/", asyncHandler(generateMagicLink));
userRoutes.get("/authenticate", asyncHandler(verifyLink));
userRoutes.get("/info", asyncHandler(requireAuth), asyncHandler(getUserInfo));

export default userRoutes;