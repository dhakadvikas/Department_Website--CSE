const Event = require("../models/event");
const fs = require("fs");
const path = require("path");

// @desc Create a new event
// @route POST /events
exports.createEvent = async (req, res) => {
    try {
        const { title, details, status } = req.body;
        const file = req.file; // Uploaded file

        if (!title || !details || !file) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newEvent = new Event({
            title,
            details,
            status,
            file: file.path, // Save file path
        });

        await newEvent.save();
        res.status(201).json({ message: "Event created successfully", event: newEvent });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// @desc Get all events (with optional status filtering)
// @route GET /events
exports.getAllEvents = async (req, res) => {
    try {
        const { status } = req.query;
        let filter = {};
        if (status) filter.status = status; // Filter by status if provided

        const events = await Event.find(filter).sort({ date: -1 });
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// @desc Get a single event by ID
// @route GET /events/:id
exports.getEventById = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) return res.status(404).json({ message: "Event not found" });

        res.status(200).json(event);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// @desc Update an event
// @route PUT /events/:id
exports.updateEvent = async (req, res) => {
    try {
        const { title, details, status } = req.body;
        const file = req.file; // Optional new file

        const updatedData = {};
        if (title) updatedData.title = title;
        if (details) updatedData.details = details;
        if (status) updatedData.status = status;
        if (file) updatedData.file = file.path; // Update file path if a new file is uploaded

        const updatedEvent = await Event.findByIdAndUpdate(req.params.id, updatedData, { new: true });

        if (!updatedEvent) return res.status(404).json({ message: "Event not found" });

        res.status(200).json({ message: "Event updated successfully", event: updatedEvent });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// @desc Delete an event
// @route DELETE /events/:id
exports.deleteEvent = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) return res.status(404).json({ message: "Event not found" });

        // Remove file from storage
        if (event.file) {
            const filePath = path.join(__dirname, "..", event.file);
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
        }

        await Event.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Event deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};
