import React from 'react'
import { Box, Button, Paper, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import { Link } from 'react-router-dom'
import AddIcon from '@mui/icons-material/Add';
import DriveFileRenameOutlineRoundedIcon from '@mui/icons-material/DriveFileRenameOutlineRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import axios from 'axios';



const Create = () => {

    const [post, setpost] = React.useState([])

    const postdataRead = async () => {
        try {
            const { data } = await axios.get('/allposts')
            setpost(data)
        } catch (err) {
            console.log('err')
        }
    }
    React.useEffect(() => {
        postdataRead()
    },[])





    return (
        <>
            <Box component={'div'} sx={{ zIndex: -1 }}>
                <Button variant='contained' LinkComponent={Link} to='/admin/createpost' startIcon={<AddIcon />}> New Post</Button>
                <Box component={'div'}>
                    <Paper sx={{ marginTop: 2, padding: 2, width: '90%' }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Photo</TableCell>
                                    <TableCell>Title</TableCell>
                                    <TableCell align='right'>Author</TableCell>
                                    <TableCell align='right'>Category</TableCell>
                                    <TableCell align='center'>Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    post.map((post, index) => (
                                        <TableRow key={post._id}>
                                            <TableCell align='left'>
                                                <img style={{width: '100px'}} src={`/uploads/${post.photo}`} alt='post' />
                                            </TableCell>
                                            <TableCell>
                                                {post.title}
                                            </TableCell>
                                            <TableCell align='right'>shakil</TableCell>
                                            <TableCell align='right'>{post.category}</TableCell>
                                            <TableCell align='center'>
                                                <Box sx={{ marginTop: 2 }}>
                                                    <Button color='secondary' sx={{ marginLeft: 2 }} variant='text' LinkComponent={Link} to={`/admin/updatepost/${post._id}`} endIcon={<DriveFileRenameOutlineRoundedIcon />} size='small' >Update</Button>
                                                    <Button color='secondary' sx={{ marginLeft: 2 }} variant='text' LinkComponent={Link} to={`/admin/deletesingle/${post._id}`} endIcon={<DeleteRoundedIcon />} size='small' >Delete</Button>
                                                </Box>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                }
                            </TableBody>
                        </Table>
                    </Paper>
                </Box>
            </Box>
        </>
    )
}

export default Create