const mongoose = require("mongoose");
const jobTypeSchema = new mongoose.Schema({
    title: { type: String, unique: true, required: true },
});

module.exports = mongoose.model("JobType", jobTypeSchema);
