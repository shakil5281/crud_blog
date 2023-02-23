const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const SubuserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        requried: true,
        trim: true,
    },
    lastName: {
        type: String,
        requried: true,
        trim: true,
    },
    email: {
        type: String,
        requried: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    admin: {
        type: String,
        requried: true,
        trim: true,
        default: 'user',
    },
    photo: {
        type: String,
        default: 'https://api-prod-minimal-v4.vercel.app/assets/images/avatars/avatar_2.jpg'
    },
    phone: {
        type: String,
        default: '01800000000'
    },
    password: {
        type: String,
        requried: true
    },
    tokens: [
        {
            token: {
                type: String,
                required: true,
            },
        }
    ],
    todos: [
        {
            type: mongoose.Types.ObjectId,
            ref: "Crud"
        },
    ]
})

SubuserSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 12);
    }
    next()
})


SubuserSchema.methods.generateAuthToken = async function () {
    try {
        const token = jwt.sign({ userId: this._id, email: this.email, firstName: this.firstName, lastName: this.lastName }, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({ token: token });
        await this.save();
        return token;

    } catch (err) {
        console.log("User Token" + err)
    }
}


const Subuse = mongoose.model("Subuse", SubuserSchema)

module.exports = Subuse;