const Academic = require("../models/academic");

// Create a new academic record
exports.createAcademic = async (req, res) => {
    try {
        const { title, status } = req.body;
        const file = req.file ? req.file.path : null;

        if (!title || !file || !status) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const academic = new Academic({ title, file, status });
        await academic.save();

        res.status(201).json({ message: "Academic record created", academic });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all academic records (with optional filter)
exports.getAcademics = async (req, res) => {
    try {
        const filter = req.query.status ? { status: req.query.status } : {};
        const academics = await Academic.find(filter);

        res.status(200).json(academics);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single academic record by ID
exports.getAcademicById = async (req, res) => {
    try {
        const academic = await Academic.findById(req.params.id);
        if (!academic) return res.status(404).json({ message: "Record not found" });

        res.status(200).json(academic);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update an academic record
exports.updateAcademic = async (req, res) => {
    try {
        const { title, status } = req.body;
        const updateData = { title, status };

        if (req.file) {
            updateData.file = req.file.path;
        }

        const updatedAcademic = await Academic.findByIdAndUpdate(
            req.params.id, 
            updateData, 
            { new: true }
        );

        if (!updatedAcademic) return res.status(404).json({ message: "Record not found" });

        res.status(200).json({ message: "Updated successfully", updatedAcademic });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete an academic record
exports.deleteAcademic = async (req, res) => {
    try {
        const deletedAcademic = await Academic.findByIdAndDelete(req.params.id);
        if (!deletedAcademic) return res.status(404).json({ message: "Record not found" });

        res.status(200).json({ message: "Deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
