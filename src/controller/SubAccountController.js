const User = require('../model/User');
const bcrypt = require('bcryptjs');




exports.CreateSubUserAccount = async (req, res) => {

    const { firstName, lastName, email, password, admin } = req.body
    if (!firstName || !lastName || !email || !password || !admin) {
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
            const userexits = await User.findOne({ email })
            if (userexits) {
                res.status(404).json({ Error: "User alreday Existing" })
            } else {
                const user = new User({ firstName, lastName, email, password, admin })
                await user.save()
                res.status(201).json({ Message: "Registration Successfull" })
            }
        } else {
            res.status(404).json({ status: "fail", data: "Invalid Request" })
        }
    }
    catch (err) {
        res.status(500).json({ status: "fail", error: err.message })
    }
}


