const express = require("express");
const router = express.Router();
const upload = require("../config/cloudinary.js");
const {
    createEvent,
    getAllEvents,
    getEventById,
    updateEvent,
    deleteEvent,
} = require("../controlers/eventController");

// Routes
router.post("/create", upload.single("file"), createEvent);
router.get("/", getAllEvents);
router.get("/:id", getEventById);
router.put("/:id", upload.single("file"), updateEvent);
router.delete("/delete/:id", deleteEvent);

module.exports = router;
