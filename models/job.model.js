const mongoose = require("mongoose");
const jobSchema = new mongoose.Schema({
    title: String,
    description: String,
    type: [{
        typeId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "JobType",
        },
        title: String,
    }, ],
    date: Date,
    location: Object,
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employer",
    },
}, { timestamps: true }, );

module.exports = mongoose.model("Job", jobSchema);