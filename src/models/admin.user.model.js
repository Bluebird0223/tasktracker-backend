const mongoose = require("mongoose");

const adminUserSchema = mongoose.Schema({
    name: {
        type: String,
        require: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
    },
    designation: {
        type: String,
        require: true,
    },
    tabAccess: [{
        tabName: {
            type: String,
            require: false
        },
        access: {
            type: String,
            require: false
        },
        _id: 0
    }],
    password: {
        type: String,
        require: true
    },
    isActive: {
        type: Boolean,
        require: true
    },

},
    {
        timestamps: true, // Adds createdAt and updatedAt automatically
        strict: false
    }
);

const adminUserModel = mongoose.model('Admin-users', adminUserSchema);

module.exports = adminUserModel;