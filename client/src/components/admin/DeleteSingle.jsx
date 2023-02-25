import axios from 'axios'
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useSnackbar } from 'notistack';
import { getToken } from '../../helper/SessonStorage';


const AxiosHeader = { headers: { "token": getToken() } }
const Deletesingle = () => {

  const navigate = useNavigate()
  const param = useParams()
  const { enqueueSnackbar } = useSnackbar();

  // axios function to create
  const createpost = async () => {
    try {
      await axios.get(`/singlepostdelete/${param.id}`, AxiosHeader);
      enqueueSnackbar('Post delete success', { variant : 'info' });
      navigate('/admin/posts')

    } catch (err) {
      console.log(err)
    }
  }

  React.useEffect(() =>{
    createpost()
  },[])
}

export default Deletesingle