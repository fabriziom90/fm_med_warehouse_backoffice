const mongoose = require('mongoose');

const TimeEntrySchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    date: { type: Date, required: true },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    durationMinutes: { type: Number },
    note: String
}, { timestamps: true });

module.exports = mongoose.model("TimeEntry", TimeEntrySchema);