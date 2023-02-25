import React from 'react'
import { Box, Button, Paper, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from '@mui/material'
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { Link, useNavigate } from 'react-router-dom';
import ReadCategory from '../../Hooks/category/ReadCategory';
import { useSnackbar } from 'notistack';
import axios from 'axios';
import { getToken } from '../../helper/SessonStorage';


const AxiosHeader = { headers: { "token": getToken() } }

const Category = () => {

    const Category = ReadCategory()
    const navigate = useNavigate()
    const { enqueueSnackbar } = useSnackbar();

    const [inputCategory, setInputCategory] = React.useState({})

const CategoryInput = async() =>{
    try{
        await axios.post('/createcategory',inputCategory, AxiosHeader)
        enqueueSnackbar('Create category success', { variant : 'success' });
        navigate('/admin/createcategory')

    }catch(err){
        console.log(err)
        enqueueSnackbar('Already exits', { variant : 'error' });
    }
}


const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputCategory(values => ({...values, [name]: value}))
  }

const categorySubmit = (e) =>{
    e.preventDefault()
    CategoryInput()
}


    return (
        <>
            <Box>
                <Typography variant='h5'>
                    Create a new category
                </Typography>
                <Box>
                    <Paper onSubmit={categorySubmit} component={'form'} sx={{ padding: 4 }} elevation={0}>
                        <TextField
                            type="text" 
                            name="category" 
                            value={inputCategory.category || ""} 
                            onChange={handleChange}
                        size='small' sx={{ width: 400 }} label='Name' />
                        <Button type='submit'>Add</Button>
                    </Paper>
                </Box>
                <Box sx={{ padding: 4 }} >
                    <Table size='small' sx={{ width: 600 }}>
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ width: 200 }}>List</TableCell>
                                    <TableCell align='center'>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    Category.map((category, i) => (
                                        <TableRow key={i.toString()}>
                                            <TableCell sx={{ width: 200 }}>
                                                {category.category}
                                            </TableCell>
                                            <TableCell align='center'>
                                                <Box>
                                                    <Button color='secondary' sx={{ marginLeft: 2 }} variant='text' LinkComponent={Link} to={`/admin/deletecategory/${category._id}`} endIcon={<DeleteRoundedIcon />} size='small' >Delete</Button>
                                                </Box>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                }
                            </TableBody>
                    </Table>
                </Box>
            </Box>
        </>
    )
}

export default Category