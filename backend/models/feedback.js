const express = require("express");
const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
    name: { type: String, required: true },
    feedback: { type: String, required: true }, // Store file path instead of buffer
    email: { type: String, required: true
    },
    date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Feedback", feedbackSchema);
