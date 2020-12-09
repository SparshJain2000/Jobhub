const mongoose = require("mongoose");
const jobSchema = new mongoose.Schema(
    {
        title: String,
        description: String,
        type: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "JobType",
            },
        ],
        date: String,
        creator: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Employer",
        },
    },
    { timestamps: true },
);

module.exports = mongoose.model("Job", jobSchema);
