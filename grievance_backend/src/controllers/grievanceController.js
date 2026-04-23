const Grievance = require("../models/Grievance");

// Submit Grievance
const addGrievance = async (req, res) => {
  try {
    const { title, description, category } = req.body;

    const grievance = await Grievance.create({
      userId: req.user.id,
      title,
      description,
      category
    });

    res.status(201).json({
      message: "Grievance Submitted",
      grievance
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// View All Grievances
const getAllGrievances = async (req, res) => {
  try {
    const data = await Grievance.find({ userId: req.user.id });

    res.status(200).json(data);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get By ID
const getGrievanceById = async (req, res) => {
  try {
    const data = await Grievance.findById(req.params.id);

    res.status(200).json(data);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update
const updateGrievance = async (req, res) => {
  try {
    const updated = await Grievance.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json(updated);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete
const deleteGrievance = async (req, res) => {
  try {
    await Grievance.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Deleted Successfully"
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Search
const searchGrievance = async (req, res) => {
  try {
    const title = req.query.title;

    const result = await Grievance.find({
      title: { $regex: title, $options: "i" },
      userId: req.user.id
    });

    res.status(200).json(result);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addGrievance,
  getAllGrievances,
  getGrievanceById,
  updateGrievance,
  deleteGrievance,
  searchGrievance
};