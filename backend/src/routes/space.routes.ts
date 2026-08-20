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

spaceRoutes.use(asyncHandler(requireAuth));

spaceRoutes.post("/", asyncHandler(createSpace));
spaceRoutes.get("/", asyncHandler(getSpaces));
spaceRoutes.get("/:id", asyncHandler(getSpaceById));
spaceRoutes.put("/:id", asyncHandler(updateSpace));
spaceRoutes.delete("/:id", asyncHandler(deleteSpace));

export default spaceRoutes;
