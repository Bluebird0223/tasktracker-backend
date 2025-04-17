const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    name: {
        type: String,
        require: true,
        unique: true
    },
    price: {
        type: Number,
        required: true,
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

const Products = mongoose.model('Products', productSchema);

module.exports = Products;