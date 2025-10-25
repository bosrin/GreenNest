import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import adminRoutes from "./routes/adminRoutes.js";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// ------------------- MIDDLEWARE -------------------
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));
app.use("/api/admin", adminRoutes);

// ------------------- MONGODB CONNECTION -------------------
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ MongoDB connection error:", err));

// ------------------- ERROR HANDLING -------------------
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message });
});

// ------------------- SERVER -------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
