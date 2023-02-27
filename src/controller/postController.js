const Post = require('../model/post')
const User = require('../model/User')
const ObjectId = require('mongodb').ObjectId;


const Summary = async (req, res) => {
    try {
        const email = req.email
        const data = await Post.aggregate([
            {
                $group: { _id: "$category", sum: { $count: {} } }
            }
        ])
        res.status(200).json({ summary: data })

    } catch (err) {
        console.error(err)
        res.status(500).json({ message: err.message })
    }
}


const Allcategorypost = async (req, res) => {
    try {
        const email = req.email
        const data = await Post.aggregate([
            {
                $group: {
                    _id: "$category",
                    products: { $push: "$$ROOT" },

                }
            }

        ])

        // const data = await Post.aggregate([
        //     {
        //       $facet: {
        //         groups: [
        //           { $group: {
        //             _id: "$category",
        //             posts: { $push: "$$ROOT" },
        //             count: { $sum: 1 }
        //           }},
        //           { $sort: { count: -1 } },
        //           { $limit: 4 }
        //         ],
        //         totalCount: [
        //           { $count: "total" }
        //         ]
        //       }
        //     },
        //     {
        //       $project: {
        //         groups: 1,
        //         totalCount: { $arrayElemAt: ["$totalCount.total", 0] }
        //       }
        //     }
        //   ])
        res.status(200).json({ summary: data })

    } catch (err) {
        console.error(err)
        res.status(500).json({ message: err.message })
    }
}


const CreatePost = async (req, res) => {
    try {
        const { title, description, category } = req.body
        const photo = ("file : ", req.file)

        if (!title) {
            res.status(400).json({ error: 'Title is required' })
        } else if (!description) {
            res.status(400).json({ error: 'Description is required' })
        } else if (!photo) {
            res.status(400).json({ error: 'photo is required' })
        } else {
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

    } catch (err) {
        console.log(err)
        res.status(500).json({ error: err.message })
    }
}


const GetAllPosts = async (req, res) => {
    try {
        const user = await User.aggregate([
            {
                $count: 'email'
            }
        ])
        if (user.length < 1) {
            res.status(404).json({ error: 'User not found' })
        } else {
            const posts = await Post.find()
            res.status(200).json(posts)
        }


    } catch (err) {
        console.log(err)
        res.status(500).json({ error: err.message })
    }
}



const UserPost = async (req, res) => {
    try {
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

        if (user.length === 1) {
            console.log(user[0].total)
            const posts = await Post.find()
            res.status(200).json(posts)
        } else {
            const data = await Post.aggregate([
                {
                    $match: {
                        email: req.email
                    }
                }
            ])
            res.status(200).json(data)
        }

    } catch (err) {
        console.log(err)
        res.status(500).json({ error: err.message })
    }
}




const CategoryPost = async (req, res) => {
    try {
        const posts = await Post.aggregate([
            {
                $match: { category: req.params.category }
            }
        ])
        return res.json(posts)

    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: err.message })
    }
}




const PostUpdate = async (req, res) => {
    try {
        const { id } = req.params
        const { title, description, category } = req.body
        const photo = ("file : ", req.file)
        if (!photo) {
            res.status(400).json({ error: 'photo is required' })
        } else {
            const userpost = await Post.findById({ _id: id })
            if (!userpost) {
                res.status(404).json({ error: 'post not found' })
            } else {
                await Post.updateOne({ _id: id }, { $set: { title, description, photo: photo.filename, category } })
                res.status(200).json({ status: "success" })

            }
        }
    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: err.message })
    }
}


const SinglePostDelete = async (req, res) => {
    try {
        const { id } = req.params

        const userpost = await Post.findById({ _id: id })
        if (!userpost) {
            res.status(404).json({ error: 'post not found' })
        } else {
            const date = await Post.deleteOne({ _id: id })
            res.status(200).json({ status: "success" })
        }

    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: err.message })
    }
}



const MultiPostDelete = async (req, res) => {
    try {
        const idsToDelete = req.body.idsToDelete.map(id => ObjectId(id.$oid));
        console.log(idsToDelete)
        const filter = { _id: { $in: idsToDelete } };
        const result = await Post.deleteMany(filter);
        res.json({ deletedCount: result.deletedCount });
    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: err.message })
    }
}




const SinglePostSearch = async (req, res) => {
    try {
        const { id } = req.params
        const post = await Post.findOne({ _id: id })
        return res.json(post)
    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: err.message })
    }
}



const PostCount = async (req, res) => {
    try {
        const post = await Post.aggregate([
            {
                $count: 'title'
            }
        ])
        return res.json(post)

    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: err.message })
    }
}


module.exports = { CreatePost, GetAllPosts, Allcategorypost, PostUpdate, SinglePostDelete, CategoryPost, MultiPostDelete, SinglePostSearch, PostCount, UserPost, Summary }