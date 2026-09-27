import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import morgan from "morgan";

import { connectDB } from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";

import { notFound, errorHandler } from "./middleware/error.js";

const app = express();

const PORT = process.env.PORT || 5000;

app.use(helmet());

app.use(compression());

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173"
  })
);

app.use(
  express.json({
    limit: "20kb"
  })
);

app.use(morgan("dev"));

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    service: "fullstack-task1-api"
  });
});

app.use("/api/auth", authRoutes);

app.use("/api/users", userRoutes);

app.use(notFound);

app.use(errorHandler);

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(
        `Backend running on http://localhost:${PORT}`
      );
    });
  })
  .catch((error) => {
    console.error(
      "Database connection failed:",
      error.message
    );

    process.exit(1);
  });
