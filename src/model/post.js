const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
    type: String,
    required: true
    },
    email: {
    type: String,
    required: true,
    trim: true,
    },
    auth: {
    type: String,
    required: true
    },
    category: {
        type: String,
        required: true,
        trim: true,
        default: 'General'
    },
    photo: {
        type: String,
        default: 'https://media.istockphoto.com/id/1385673856/photo/default-in-russia-russian-financial-crisis-due-to-sanctions-inability-to-pay-international.jpg?s=1024x1024&w=is&k=20&c=t7500pJiU7lfT0lFCcqp94-d4iBlDKLmzJbAWvfrgtw='
    },
    date: {
        type: Date,
        default: new Date()
    }
}, {versionKey: false})

module.exports = mongoose.model('Post', PostSchema)  