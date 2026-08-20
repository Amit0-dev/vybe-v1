import type { Express } from "express";
import userRoutes from "./user.routes";
import spaceRoutes from "./space.routes";

export function registerRoutes(app: Express) {
    app.use("/api/user", userRoutes);
    app.use("/api/space", spaceRoutes);
}
