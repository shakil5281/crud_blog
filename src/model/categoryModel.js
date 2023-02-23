const mongoose  = require('mongoose');

const Categories = new mongoose.Schema({
    category: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        default: 'general'
    }
}, {versionKey: false})


const Category = mongoose.model('Category', Categories)
module.exports = Category