const Category = require('../model/categoryModel')

const CreateCategory = async(req, res) =>{
    try{
        const {category} = req.body
        const exists = await Category.findOne({category})
        if(exists){
            res.status(400).json({message: 'Category already exists'})
        }else{
            const newCategory = new Category({category})
            await newCategory.save()
            res.status(201).json(newCategory)
        }

    }catch(err){
        res.status(500).json({message: err.message})
    }
}

const GetAllCategories = async(req, res)=>{
    try{
        const category = await Category.find()
        res.status(200).json(category)

    }catch(err){
        res.status(500).json({message: err.message})
    }
}


const UpdateCategory = async(req, res)=>{
    try{
        const {id} = req.params
        const {category} = req.body
       const updateCategory =  await Category.updateOne({id},{$set: {category}})
        res.status(200).json(updateCategory)

    }catch(err){
        res.status(500).json({message: err.message})
    }
}


const DeleteCategory = async(req, res)=>{
    try{
        const {id} = req.params
        const category = await Category.deleteOne({_id: id})
        res.status(200).json(category)

    }catch(err){
        res.status(500).json({message: err.message})
    }
}



module.exports = {CreateCategory, GetAllCategories, UpdateCategory, DeleteCategory}