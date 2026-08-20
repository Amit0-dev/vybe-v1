import express from "express";
import { asyncHandler } from "../utils/async-handler";
import { requireAuth } from "../middleware/auth.middleware";
import { addVideo, getVideos, removeVideo, updateUpVote } from "../controllers/video.controller";

const videoRoutes = express.Router({ mergeParams: true });

videoRoutes.use(asyncHandler(requireAuth));

videoRoutes.post("/", asyncHandler(addVideo));
videoRoutes.put("/:videoId", asyncHandler(updateUpVote));
videoRoutes.delete("/:videoId", asyncHandler(removeVideo));
videoRoutes.get("/", asyncHandler(getVideos));

export default videoRoutes;
