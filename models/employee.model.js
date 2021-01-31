const mongoose = require("mongoose");
const employeeSchema = new mongoose.Schema(
    {
        firstName: String,
        lastName: String,
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        rating: Number, //avg ratings
        wage: Number,
        experience: Number,
        location: Object,
        reviews: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Reviews",
            },
        ],
        skills: [
            {
                typeId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "JobType",
                },
                title: String,
            },
        ],
        completedJobs: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Job",
            },
        ],
    },
    { timestamps: true },
);

module.exports = mongoose.model("Employee", employeeSchema);
