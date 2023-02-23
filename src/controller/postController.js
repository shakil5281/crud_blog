const Post = require('../model/post')
const User = require('../model/User')

const CreatePost = async(req, res) =>{
    try{
        const {title,description,category} = req.body 
        const photo = ("file : ", req.file)

        if(!title){
            res.status(400).json({error: 'Title is required'})
        }else if(!description){
            res.status(400).json({error: 'Description is required'})
        }else if(!photo){
            res.status(400).json({error: 'photo is required'})
        }else{
            const newPost = new Post({
                title,
                description,
                email: req.email,
                auth: req.firstName,
                photo: photo.filename,
                category
            })

            const post = await newPost.save()
            return res.json(post)
        }
        
    }catch(err){
        console.log(err)
    }
}

const GetAllPosts = async(req, res) =>{
    try{
       const user =  await User.aggregate([
            {
                $count: 'email'
            }
        ])
        if(user.length < 1){
            res.status(404).json({error: 'User not found'})
        }else{
        const posts = await Post.find()
        res.status(200).json(posts)
        }


    }catch(err){
        console.log(err)
        res.status(500).json({error: err.message})
    }
}

const UserPost = async(req, res) =>{
    try{
        const user = await User.aggregate([
            {
                $match: {
                    email: req.email,
                    admin: 'superadmin'
                }
            },
            {
                $count: "total"
            }
        ])
        
        if(user.length === 1){
            console.log(user[0].total)
            const posts = await Post.find()
            res.status(200).json(posts)
        }else{
          const data =   await Post.aggregate([
                {
                    $match: {
                        email: req.email
                    }
                }
            ])
            res.status(200).json(data)
        }

       
    }catch(err){
        console.log(err)
        res.status(500).json({error: err.message})
    }
}










const CategoryPost = async(req, res) =>{
    try{
        const posts = await Post.aggregate([
            {
                $match: {category: req.params.category}
            }
        ])
        return res.json(posts)

    }catch(err){
        console.log(err)
        return res.status(500).json({error: err.message})
    }
}



const PostUpdate = async(req, res) =>{
    try{
        const {id} = req.params
        const {title,description,category} = req.body 
        const photo = ("file : ", req.file)
        if(!photo){
            res.status(400).json({error: 'photo is required'})
        }else{
            const date = await Post.updateOne({_id: id}, {$set:{title,description,photo: photo.filename, category}})
            return res.json(date)
        }


    }catch(err){
        console.log(err)
        return res.status(500).json({error: err.message})
    }
}
const SinglePostDelete = async(req, res) =>{
    try{
        const {id} = req.params
        const date = await Post.deleteOne({_id: id})
        return res.json(date)


    }catch(err){
        console.log(err)
        return res.status(500).json({error: err.message})
    }
}
const MultiPostDelete = async(req, res) =>{
    try{
        const {id} = req.body
        const date = await Post.deleteOne({_id: id})
        return res.json(date)


    }catch(err){
        console.log(err)
        return res.status(500).json({error: err.message})
    }
}


const SinglePostSearch = async(req, res) =>{
    try{
        const {id} = req.params
        const post = await Post.findOne({_id: id})
        return res.json(post)
    }catch(err){
        console.log(err)
        return res.status(500).json({error: err.message})
    }
}

const PostCount = async(req, res) =>{
    try{
        const post  = await Post.aggregate([
              {
                $count: 'title'
              }
        ])
        return res.json(post)

    }catch(err){
        console.log(err)
        return res.status(500).json({error: err.message})
    }
}


module.exports = {CreatePost, GetAllPosts, PostUpdate,SinglePostDelete, CategoryPost, MultiPostDelete, SinglePostSearch, PostCount, UserPost}