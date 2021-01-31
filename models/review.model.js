const mongoose = require("mongoose");
const reviewSchema = new mongoose.Schema(
    {
        comment: String,
        rating: Number,
        author: {
            id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Employer",
            },
            username: String,
        },
    },
    { timestamps: true },
);

module.exports = mongoose.model("Review", reviewSchema);
