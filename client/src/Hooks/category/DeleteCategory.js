import React from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { useSnackbar } from 'notistack';
import { getToken } from '../../helper/SessonStorage';

const AxiosHeader = { headers: { "token": getToken() } }
const DeleteCategory = () => {

    const param = useParams()
    const navigate = useNavigate()
    const { enqueueSnackbar } = useSnackbar();

    const ListCategories = async() =>{
        try{
            await axios.get(`/deletecategory/${param.id}`, AxiosHeader)
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