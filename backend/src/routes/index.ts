import type { Express } from "express";
import userRoutes from "./user.routes.js";
import spaceRoutes from "./space.routes.js";
import videoRoutes from "./video.routes.js";

export function registerRoutes(app: Express) {
    spaceRoutes.use("/:id/video", videoRoutes);
    app.use("/api/space", spaceRoutes);
    app.use("/api/user", userRoutes);
}
