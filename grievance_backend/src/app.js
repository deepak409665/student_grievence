const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const grievanceRoutes = require("./routes/grievanceRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// Auth Routes
app.use("/api", authRoutes);

// Grievance Routes
app.use("/api/grievances", grievanceRoutes);

module.exports = app;