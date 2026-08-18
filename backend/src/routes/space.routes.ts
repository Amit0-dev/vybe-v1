import express from "express";
import { asyncHandler } from "../utils/async-handler";
import { requireAuth } from "../middleware/auth.middleware";
import {
    createSpace,
    deleteSpace,
    getSpaceById,
    getSpaces,
    updateSpace,
} from "../controllers/space.controller";

const spaceRoutes = express.Router();

spaceRoutes.post("/", asyncHandler(requireAuth), asyncHandler(createSpace));
spaceRoutes.get("/", asyncHandler(requireAuth), asyncHandler(getSpaces));
spaceRoutes.get("/:id", asyncHandler(requireAuth), asyncHandler(getSpaceById));
spaceRoutes.put("/:id", asyncHandler(requireAuth), asyncHandler(updateSpace));
spaceRoutes.delete("/:id", asyncHandler(requireAuth), asyncHandler(deleteSpace));

export default spaceRoutes;
