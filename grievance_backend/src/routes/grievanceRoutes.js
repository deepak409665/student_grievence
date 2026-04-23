const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  addGrievance,
  getAllGrievances,
  getGrievanceById,
  updateGrievance,
  deleteGrievance,
  searchGrievance
} = require("../controllers/grievanceController");

// Submit grievance
router.post("/", protect, addGrievance);

// View all grievances
router.get("/", protect, getAllGrievances);

// Search grievance
router.get("/search", protect, searchGrievance);

// View by ID
router.get("/:id", protect, getGrievanceById);

// Update
router.put("/:id", protect, updateGrievance);

// Delete
router.delete("/:id", protect, deleteGrievance);

module.exports = router;