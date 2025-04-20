const mongoose = require("mongoose");

const projectSchema = mongoose.Schema({
    projectName: {
        type: String,
        require: true,
    },
    companyName: {
        type: String,
        require: true,
    },
    ownerName: {
        type: String,
        require: true,
    },
    ownerNumber: {
        type: String,
        require: true,
    },
    startDate: {
        type: Date,
        require: true,
    },
    endDate: {
        type: Date,
        require: false,
    },
    status: {
        type: String,
        require: false,
        enum: ["new", "ongoing", "pending", "completed"],
        default: "new",
    },
    isActive: {
        type: Boolean,
        require: true,
        default: true,
    },

},
    {
        timestamps: true, // Adds createdAt and updatedAt automatically
        strict: false
    }
);

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;