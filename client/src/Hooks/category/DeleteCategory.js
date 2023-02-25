import React from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { useSnackbar } from 'notistack';


const DeleteCategory = () => {

    const param = useParams()
    const navigate = useNavigate()
    const { enqueueSnackbar } = useSnackbar();

    const ListCategories = async() =>{
        try{
            await axios.get(`/deletecategory/${param.id}`)
            enqueueSnackbar('Post delete success', { variant : 'success' });
            navigate('/admin/category')
        }catch(err){
            console.log(err)
        }
    }


    React.useEffect(()=>{
        ListCategories()
    },[])


}

export default DeleteCategory