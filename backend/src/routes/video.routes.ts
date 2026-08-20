import express from "express";
import { asyncHandler } from "../utils/async-handler.js";
import { requireAuth } from "../middleware/auth.middleware.js";
import { addVideo, getVideos, removeVideo, updateUpVote } from "../controllers/video.controller.js";

const videoRoutes = express.Router({ mergeParams: true });

videoRoutes.use(asyncHandler(requireAuth));

videoRoutes.post("/", asyncHandler(addVideo));
videoRoutes.put("/:videoId", asyncHandler(updateUpVote));
videoRoutes.delete("/:videoId", asyncHandler(removeVideo));
videoRoutes.get("/", asyncHandler(getVideos));

export default videoRoutes;
