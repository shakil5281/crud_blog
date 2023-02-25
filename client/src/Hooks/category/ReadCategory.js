import React from 'react'
import axios from 'axios'
import { getToken } from '../../helper/SessonStorage'

const AxiosHeader = { headers: { "token": getToken() } }
const ReadCategory = () => {

    const [category, setcategory] = React.useState([])

    const ListCategories = async() =>{
        try{
            const {data} = await axios.get('/allcategories', AxiosHeader)
            setcategory(data)
        }catch(err){
            console.log(err)
        }
    }


    React.useEffect(()=>{
        ListCategories()
    },[])

    return category;

}

export default ReadCategory