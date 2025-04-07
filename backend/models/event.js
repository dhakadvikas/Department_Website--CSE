
const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
    title: { type: String, required: true },
    file: { type: String, required: true }, // Store file path instead of buffer
    details: { type: String, required: true },
    status:{enum :['upcoming','ongoing','completed'],type:String},
    date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Event", eventSchema);
