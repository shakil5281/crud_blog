const mongoose = require('mongoose');
const OTPSchema = mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    otp: {
        type: String
    },
    status: {
        type: Number,
        default: 0
    },
    createdDate: {
        type: Date,
        default: Date.now()
    }
}, { versionKey: false });
const OTPModel = mongoose.model('otps', OTPSchema);
module.exports = OTPModel