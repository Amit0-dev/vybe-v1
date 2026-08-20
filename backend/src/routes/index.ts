import type { Express } from "express";
import userRoutes from "./user.routes";
import spaceRoutes from "./space.routes";
import videoRoutes from "./video.routes";

export function registerRoutes(app: Express) {
    spaceRoutes.use("/:id/video", videoRoutes);
    app.use("/api/space", spaceRoutes);
    app.use("/api/user", userRoutes);
}
