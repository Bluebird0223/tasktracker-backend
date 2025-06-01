const mongoose = require("mongoose");


const inventorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    unitPrice: {
        type: String,
        required: true,
    },
    quantity: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    }

}, {
    timestamps: true, // Automatically includes `createdAt` and `updatedAt`
    strict: false
});

const Inventory = mongoose.model("Inventory", inventorySchema);
module.exports = Inventory;
