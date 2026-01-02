const mongoose = require('mongoose');

const TimeEntrySchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    date: { type: Date, required: true },
    start: { type: Date, required: true },
    end: { type: Date, required: true },
    durationMinutes: { type: Number },
    note: { type: String}
}, { timestamps: true });

module.exports = mongoose.model("TimeEntry", TimeEntrySchema);