import express from "express";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(
    cors({
        origin: process.env.CLIENT_URL ?? "http://localhost:5173",
        methods: ["POST", "GET", "PATCH", "PUT", "DELETE"],
    }),
);

app.get("/health", (_req, res) => {
    res.status(200).json({
        status: "ok",
    });
});

export default app;
