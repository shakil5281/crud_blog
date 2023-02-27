const OTPModel = require("../model/OTPmodel");
const User = require("../model/User");
const SentEmailutility = require('../utility/SentEmailutility')
const bcrypt = require('bcryptjs');
const Post = require('../model/post')



exports.AccountVerify = async (req, res) => {
    let email = req.params.email;
    let OTPCode = Math.floor(100000 + Math.random() * 900000)
    try {

        const user = await User.aggregate([{ $count: 'email' }])
        if (user.length < 1) {
            await OTPModel.create({ email: email, otp: OTPCode })
            // Email Send
            let SendEmail = await SentEmailutility(email, "Your PIN Code is= " + OTPCode, "New account OTP verification")
            res.status(200).json({ status: "success", data: SendEmail })
        } else {
            res.status(404).json({ error: "User Request Failed" })
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message || "Internal Server Error" })
    }
}

exports.AccountVerifyOTP = async (req, res) => {
    let email = req.params.email;
    let OTPCode = req.params.otp;
    let status = 0;
    let statusUpdate = 1;
    try {
        let OTPCount = await OTPModel.aggregate([{ $match: { email: email, otp: OTPCode, status: status } }, { $count: "total" }])
        if (OTPCount.length > 0) {
            await OTPModel.updateOne({ email: email, otp: OTPCode, status: status }, {
                email: email,
                otp: OTPCode,
                status: statusUpdate
            })
            res.status(200).json({ status: "success" })
        } else {
            res.status(404).json({ status: "fail", error: "Invalid OTP Code" })
        }
    }
    catch (err) {
        res.status(500).json({ status: "fail", error: err.message })
    }
}



exports.CreateAccount = async (req, res) => {

    const { firstName, lastName, email, password, otp } = req.body
    if (!firstName || !lastName || !email || !password || !otp) {
        return res.status(422).json({ Error: "Pls ! Data insert full fill." })
    }
    let statusUpdate = 1;

    try {
        let OTPUsedCount = await OTPModel.aggregate([{ $match: { email: email, otp: otp, status: statusUpdate } }, { $count: "total" }])
        if (OTPUsedCount.length > 0) {
            const userexits = await User.findOne({ email })
            if (userexits) {
                res.status(404).json({ Error: "User alreday Existing" })
            } else {
                const user = new User({ firstName, lastName, email, password })
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


exports.AccountUpdate = async(req, res) =>{
    try{
        const email = req.email
        const {firstName,lastName, phone} = req.body
        const user = await User.updateOne({email},{$set: {firstName, lastName,phone}})
        res.status(201).json({status:"success"})
    }catch(err){
        console.log(err)
        res.status(500).json({error: err.message || "Invalid Request" })
    }
}


exports.AccountDelete = async(req, res) =>{
    try{
        const email = req.email
        const 
        user = await User.findOne({email})
        if(user){
            await User.deleteOne({email})
            await Post.deleteMany({email})
            res.status(200).json({status: "success", message: "Account deleted successfully"})
        }else{
            res.status(200).json({error: "Fail", message: "User Not Found"})  
        }

    }catch(err){
        console.log(err)
        res.status(500).json({error: err.message || "Invalid Request" })
    }
}


exports.AccountRead = async(req, res) =>{
    try{
        const email = req.email
        const user = await User.findOne({email}, {firstName: 1, lastName: 1, email: 1, photo: 1,phone: 1})
        res.status(200).json({data: user})
    }catch(err){
        console.log(err)
        res.status(500).json({error: err.message || "Invalid Request" })
    }
}








exports.login = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            res.clearCookie('jwtoken')
            return res.status(422).json({ Error: "Pls ! Proper form full fill." })
        }

        const userexits = await User.findOne({ email })
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