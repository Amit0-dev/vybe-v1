import type { Express } from "express";
import userRoutes from "./user.routes";

export function registerRoutes(app: Express) {
    app.use("/api/user", userRoutes);
}
