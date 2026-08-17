import express from "express";
import cors from "cors";
import { registerRoutes } from "./routes";
import { errorHandler } from "./middleware/error-handler.middleware";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin: process.env.CLIENT_URL ?? "http://localhost:5173",
        methods: ["POST", "GET", "PATCH", "PUT", "DELETE"],
        credentials: true,
    }),
);

app.get("/health", (_req, res) => {
    res.status(200).json({
        status: "ok",
    });
});

registerRoutes(app);
app.use(errorHandler);

export default app;
