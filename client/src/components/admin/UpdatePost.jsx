import React from 'react'
import { Box, Button, FormControl, InputLabel, MenuItem, Paper, Select, TextField, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import axios from 'axios'
import {useNavigate,useParams} from 'react-router-dom'
import ReadCategory from '../../Hooks/category/ReadCategory'
import { useSnackbar } from 'notistack';


const UpdatePost = () => {

  const navigate = useNavigate()
  const param = useParams()
  const Category = ReadCategory()
  const { enqueueSnackbar } = useSnackbar();


  const [inputs, setInputs] = React.useState({});
  const [imgFile, setImgFile] = React.useState('')




  // input hendlers
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({ ...values, [name]: value }))
  }


  const handleImg = (e) =>{
    setImgFile(e.target.files[0])
  }



  const handleSubmit = async(event) => {
    event.preventDefault();

    const formdata= new FormData()
    formdata.append('photo', imgFile)
    formdata.append('title', inputs.title)
    formdata.append('description', inputs.description)
    formdata.append('category', inputs.category)

    const config = {
      headers: {
        'content-type':'multipart/form-data'
      }
    }
    try{
      await axios.post(`/postupdate/${param.id}`, formdata, config);  
      enqueueSnackbar('post Update success', { variant: 'success' });   
      navigate('/admin/create')
    }catch(err){
      console.log(err)
    }
  }


const singlepostSearch = async()=>{
  try{
    const {data} = await axios.get(`/singlepostSearch/${param.id}`)
    setInputs(data)
    
  }catch(err){
    console.log(err)
  }
}


  React.useEffect(()=>{
    singlepostSearch()
  }, [])

  return (
    <>
      <Box sx={{ zIndex: -1 }} component={'div'}>
        <Paper sx={{ width: '90%', padding: 2 }} elevation={0}>
          <Typography color='primary' variant='h4'>
            Create Post
          </Typography>
          <Stack onSubmit={handleSubmit} component={'form'}
            encType="multipart/form-data"
          >
            <TextField
              required
              type="text"
              name="title"
              value={inputs.title || ""}
              onChange={handleChange}
              sx={{ marginTop: 5 }} variant='standard' label='Add Title' fullWidth />

            <TextField
            required
              type="text"
              name="description"
              value={inputs.description || ""}
              onChange={handleChange}
              multiline
              rows={10}
              sx={{ marginTop: 5 }} variant='outlined' label='Post Description' fullWidth />

            <Stack sx={{ marginTop: 3 }} direction="row" alignItems="center" spacing={2}>
              <Typography>
                Photo Upload
              </Typography>
              <TextField
              required
                variant='outlined'
                name='photo'
                onChange={handleImg}
                accept="image/*" multiple type="file" />
            </Stack>
            <Box component={'div'} sx={{ maxWidth: 200, marginTop: 4 }}>
              <FormControl id="demo-simple-select-label" fullWidth>
                <InputLabel id="demo-simple-select-label">Category</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  name='category'
                  value={inputs.category || ""}
                  label="category"
                  onChange={handleChange}
                >
                  {
                    Category.map(category =>(
                      <MenuItem required key={category._id} value={category.category}>{category.category}</MenuItem>
                    ))
                  }
                </Select>
              </FormControl>
            </Box>
            <Box component={'div'}>
              <Button type='submit' sx={{ marginTop: 5, padding: '15px 40px' }} variant='outlined'>Update</Button>
            </Box>
          </Stack>
        </Paper>
      </Box>
    </>
  )
}

export default UpdatePost