import React from 'react'
import Sideber from './Sideber'
import axios from 'axios'
import Loading from './Loading'
import { useNavigate } from 'react-router-dom'


const Navber = () => {

  const [data, setdata] = React.useState(false)
  const navigate = useNavigate()

  const ReadData = async( ) =>{
    try{
      await axios.get('/allposts')
      setdata(true)
    }catch(err){
      setdata(false)
      navigate('/users/accoutverify')
      console.log('err')
    }
  }



  React.useEffect(() =>{
    ReadData()
  }, [])

  return (
    <>
    {
      data ? <Sideber /> : <Loading />
    }
      
    </>
  )
}

export default Navber