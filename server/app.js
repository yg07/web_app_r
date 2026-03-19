const express = require("express");
const cors = require("cors");
const { initDatabase } = require("./config/database");

// Import routes
const prodRoutes = require("./routes/prodRoutes");
const categRoutes = require("./routes/categRoutes");
const predprRoutes = require("./routes/predprRoutes");
const skladRoutes = require("./routes/skladRoutes");
const orderRoutes = require("./routes/orderRoutes");
const specRoutes = require("./routes/specRoutes");

const app = express();

// Middleware
app.use(cors({
  origin: ["http://localhost:3000"],
}));
app.use(express.json());
app.use(express.static("static"));

// Initialize database connection
initDatabase();

// Routes
app.use("/", prodRoutes);
app.use("/", categRoutes);
app.use("/", predprRoutes);
app.use("/", skladRoutes);
app.use("/", orderRoutes);
app.use("/", specRoutes);

module.exports = app;
