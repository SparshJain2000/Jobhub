const mongoose = require("mongoose");
const employerSchema = new mongoose.Schema(
    {
        firstName: String,
        lastName: String,
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        jobs: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Job",
            },
        ],
    },
    { timestamps: true },
);

module.exports = mongoose.model("Employer", employerSchema);
