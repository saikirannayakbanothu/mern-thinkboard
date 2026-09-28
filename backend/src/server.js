import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

const allowedOrigins = [
  "http://localhost:5173",
  "https://frontend-w8y6.vercel.app",
];

app.use(
  cors({
    origin: allowedOrigins,
  })
);

app.use(express.json());
app.use(rateLimiter);

app.use("/api/notes", notesRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "ThinkBoard API is running",
  });
});

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server started on PORT:", PORT);
  });
});

export default app;