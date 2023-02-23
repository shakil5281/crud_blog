const express = require('express')
const router = express.Router()
const AuthVerify = require('../meddleware/AuthVerify')
const {CreatePost, GetAllPosts,PostUpdate,SinglePostDelete,CategoryPost,MultiPostDelete, SinglePostSearch, PostCount,  UserPost} = require('../controller/postController')
const {CreateCategory, GetAllCategories, UpdateCategory, DeleteCategory} = require('../controller/categoryController')
const upload = require('../meddleware/uploadphoto')
const UserController = require('../controller/AccountController')
const SubUserController = require('../controller/SubAccountController')



router.post('/accountverification/:email', UserController.AccountVerify)
router.post('/otpverification/:email/:otp', UserController.AccountVerifyOTP)
router.post('/createaccount', UserController.CreateAccount)
router.post('/login', UserController.login)



router.post('/createsubaccount',AuthVerify, SubUserController.CreateSubUserAccount)
router.post('/subuserlogin', SubUserController.SubUserLogin)




router.post('/create',upload.single('photo'),AuthVerify, CreatePost)
router.get('/categorypost/:category',AuthVerify, CategoryPost)
router.post('/postupdate/:id',upload.single('photo'),AuthVerify, PostUpdate)
router.get('/singlepostdelete/:id',AuthVerify, SinglePostDelete)
router.get('/multipostdelete',AuthVerify, MultiPostDelete)
router.get('/postCount',AuthVerify,PostCount)
router.get('/userpost', AuthVerify, UserPost)




router.get('/singlepostSearch/:id', SinglePostSearch)
router.get('/allposts', GetAllPosts)




// Router functions categories
router.post('/createcategory',AuthVerify, CreateCategory)
router.get('/allcategories',AuthVerify, GetAllCategories)
router.post('/updatecategory/:id',AuthVerify, UpdateCategory)
router.get('/deletecategory/:id',AuthVerify, DeleteCategory)



module.exports = router;