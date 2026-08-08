require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");
const apiRoutes = require("./routes/apiRoutes");

const app = express();
const port = process.env.PORT || 5000;

// Connect Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api", apiRoutes);

app.get("/", (req, res) => {
  res.send("🚀 Startup AI Backend Running");
});

app.listen(port, () => {
  console.log(`✅ Backend server running on port ${port}`);
});