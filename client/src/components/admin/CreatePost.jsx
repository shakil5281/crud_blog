import React from 'react'
import { Box, Button, FormControl, InputLabel, MenuItem, Paper, Select, TextField, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import ReadCategory from '../../Hooks/category/ReadCategory'
import { useSnackbar } from 'notistack';
import { getToken } from '../../helper/SessonStorage'


const AxiosHeader = { headers: { "token": getToken() } }


const CreateNewPost = () => {

  const navigate = useNavigate()
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


  const handleSubmit = async(event, variant) => {
    event.preventDefault();

    const formdata= new FormData()
    formdata.append('photo', imgFile)
    formdata.append('title', inputs.title)
    formdata.append('description', inputs.description)
    formdata.append('category', inputs.category)

    const config = {
      headers: {
        'content-type':'multipart/form-data',
        "token": getToken()
      }
    }
    try{
      await axios.post('/create', formdata, config, AxiosHeader);     
      enqueueSnackbar('New post create success', { variant });
        navigate('/admin/posts')
    }catch(err){
      enqueueSnackbar(err.response.data.error, { variant:'error' });
    }
  }

  return (
    <>
      <Box sx={{ zIndex: -1 }} component={'div'}>
        <Paper sx={{ width: '90%', padding: 2 }} elevation={0}>
          <Typography color='primary' variant='h4'>
            Create Post
          </Typography>
          <Stack onSubmit={((event)=>handleSubmit(event,'success'))} component={'form'}
            encType="multipart/form-data"
          >
            <TextField
             required
              type="text"
              name="title"
              value={inputs.title || ''}
              onChange={handleChange}
              sx={{ marginTop: 5 }} size='lg' variant='standard' label='Add Title'  />

            <TextField
            required
              type="text"
              name="description"
              value={inputs.description || ''}
              onChange={handleChange}
              multiline
              rows={10}
              sx={{ marginTop: 5 }} variant='outlined' label='Post Description'  />

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
                  value={inputs.category || ''}
                  label="category"
                  onChange={handleChange}
                >
                  {
                    Category.map(category =>(
                      <MenuItem key={category._id} value={category.category}>{category.category}</MenuItem>
                    ))
                  }
                </Select>
              </FormControl>
            </Box>
            <Box component={'div'}>
              <Button  type='submit' sx={{ marginTop: 5, padding: '15px 40px' }} variant='outlined'>Publish</Button>
            </Box>
          </Stack>
        </Paper>
      </Box>
    </>
  )
}

export default CreateNewPost