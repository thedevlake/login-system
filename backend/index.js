import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
dotenv.config();
console.log("JWT Secret is:", process.env.JWT_SECRET);

const app = express();
const PORT = process.env.PORT || 5555;

// Middleware
app.use(cors());
app.use(express.json());


// Routes
app.use("/api/auth", authRoutes);

// Test Route
app.get("/", (req, res) => {
  res.send("API is running...");
  
});

// Start server
app.listen(PORT, () => {
  console.log(` Server running on  http://localhost:${PORT}`);
});
