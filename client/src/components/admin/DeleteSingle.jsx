import axios from 'axios'
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useSnackbar } from 'notistack';

const Deletesingle = () => {

  const navigate = useNavigate()
  const param = useParams()
  const { enqueueSnackbar } = useSnackbar();

  // axios function to create
  const createpost = async () => {
    try {
      await axios.get(`/singlepostdelete/${param.id}`);
      enqueueSnackbar('Post delete success', { variant : 'info' });
      navigate('/admin/create')

    } catch (err) {
      console.log(err)
    }
  }

  React.useEffect(() =>{
    createpost()
  },[])
}

export default Deletesingle