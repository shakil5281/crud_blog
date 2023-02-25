import React from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

const SingleHooks = () => {

    const param = useParams()

  const [post, setpost] = React.useState([])

const SinglePost = async () =>{
    try{
        
        const {data} = await axios.get(`/singlepostSearch/${param.id}`)
        setpost(data)
    }catch(err){
        console.log(err)
    }
}



  React.useEffect(()=>{
    SinglePost()
  }, [])
  return post
}

export default SingleHooks