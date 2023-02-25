import React from 'react'
import { useNavigate } from 'react-router-dom'

const CreateCategory = () => {
    const navigate = useNavigate()
    

    React.useEffect(()=>{
        navigate('/admin/category')
    },[])

}


export default CreateCategory