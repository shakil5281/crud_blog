const User = require('../model/User');
const SubUser = require('../model/SubUserModel');
const bcrypt = require('bcryptjs');




exports.CreateSubUserAccount = async (req, res) => {

    const { firstName, lastName, email, password } = req.body
    if (!firstName || !lastName || !email || !password) {
        return res.status(422).json({ Error: "Pls ! Data insert full fill." })
    }

    try {
        let UserCount = await User.aggregate([{
            $match: {
                email: req.email,
                admin:
                    "superadmin"
            }
        }, { $count: "total" }])
        if (UserCount.length > 0) {
            const userexits = await SubUser.findOne({ email })
            if (userexits) {
                res.status(404).json({ Error: "User alreday Existing" })
            } else {
                const user = new SubUser({ firstName, lastName, email, password })
                await user.save()
                res.status(201).json({ Message: "Registration Successfull" })
            }
        } else {
            res.status(404).json({ status: "fail", data: "Invalid Request" })
        }
    }
    catch (e) {
        res.status(500).json({ status: "fail", data: e })
    }
}


exports.SubUserLogin = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            res.clearCookie('jwtoken')
            return res.status(422).json({ Error: "Pls ! Proper form full fill." })
        }

        const userexits = await SubUser.findOne({ email })
        if (userexits) {
            const isMatch = await bcrypt.compare(password, userexits.password)
            const token = await userexits.generateAuthToken()
            if (isMatch) {
                res.status(200).json({ Message: "Login Successfull", Token: token })
            } else {
                res.status(404).json({ Message: "Passwrod dose not match!" })
            }
        } else {
            res.status(404).json({ Message: "Email dose not match!" })
        }
    }

    catch (err) {
        res.status(505).json({ error: "server side err!" })
        console.log(err)
    }
}