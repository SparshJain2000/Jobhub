const mongoose = require("mongoose");
const employeeSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    rating: Number,
    wage: Number,
    experience: Number,
    skills: [{
        typeId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "JobType",
        },
        title: String,
    }, ],
    completedJobs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job",
    }, ],
}, { timestamps: true }, );

module.exports = mongoose.model("Employee", employeeSchema);