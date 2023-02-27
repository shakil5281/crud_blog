const express = require('express')
const router = express.Router()
const AuthVerify = require('../meddleware/AuthVerify')
const {CreatePost, GetAllPosts,PostUpdate,Allcategorypost, SinglePostDelete,CategoryPost,MultiPostDelete, SinglePostSearch, PostCount,  UserPost, Summary} = require('../controller/postController')
const {CreateCategory, GetAllCategories, UpdateCategory, DeleteCategory} = require('../controller/categoryController')
const upload = require('../meddleware/uploadphoto')
const UserController = require('../controller/AccountController')
const SubUserController = require('../controller/SubAccountController')



router.post('/accountverification/:email', UserController.AccountVerify)
router.post('/otpverification/:email/:otp', UserController.AccountVerifyOTP)
router.post('/createaccount', UserController.CreateAccount)
router.post('/login', UserController.login)



router.post('/createsubaccount',AuthVerify, SubUserController.CreateSubUserAccount)




router.get('/summary', AuthVerify, Summary)

router.post('/create',upload.single('photo'),AuthVerify, CreatePost)
router.get('/categorypost/:category',AuthVerify, CategoryPost)
router.post('/postupdate/:id',upload.single('photo'),AuthVerify, PostUpdate)
router.get('/singlepostdelete/:id',AuthVerify, SinglePostDelete)
router.get('/multipostdelete',AuthVerify, MultiPostDelete)
router.get('/postCount',AuthVerify,PostCount)
router.get('/userpost', AuthVerify, UserPost)

router.get('/user', AuthVerify, UserController.AccountRead)
router.post('/userupdate', AuthVerify, UserController.AccountUpdate)
router.post('/userdelete', AuthVerify, UserController.AccountDelete)





router.get('/allposts', GetAllPosts)
router.get('/singlepostSearch/:id', SinglePostSearch)
router.get('/allcategorypost', Allcategorypost)




// Router functions categories
router.post('/createcategory',AuthVerify, CreateCategory)
router.get('/allcategories',AuthVerify, GetAllCategories)
router.post('/updatecategory/:id',AuthVerify, UpdateCategory)
router.get('/deletecategory/:id',AuthVerify, DeleteCategory)



module.exports = router;