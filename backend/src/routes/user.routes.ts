import express from "express";
import { generateMagicLink, verifyLink } from "../controllers/user.controller";
import { asyncHandler } from "../utils/async-handler";

const userRoutes = express.Router();

userRoutes.post("/", asyncHandler(generateMagicLink));
userRoutes.get("/authenticate", asyncHandler(verifyLink));

export default userRoutes;