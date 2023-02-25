import React from 'react'
import { Box, Button, ImageList, ImageListItem, Paper, Typography } from '@mui/material'
import axios from 'axios'
import { Link } from 'react-router-dom'

const AllPost = () => {
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
    <Box component={'div'} sx={{ width: '90%'}}>
      {
        post.map((post)=>(
          <Paper key={post._id} sx={{ padding: 2, display: 'flex', marginTop: 2, boxShadow: 'none' }}>
          <ImageList sx={{ width: 400, height: 170, overflow: 'hidden' }}>
            <ImageListItem>
              <img
                src={`/uploads/${post.photo}`}
                loading="lazy"
                alt='Computer'
              />
            </ImageListItem>
          </ImageList>
          <Box sx={{width: '70%', marginLeft: -20}}>
            <Typography variant='h5'>
              {post.title}
            </Typography>
            <Box component={'div'}
            sx={{ padding: .5, height: 100, overflow: 'hidden', marginBottom: 2}}
            >
            <Typography sx={{maxHeight: '30px', height: '50px'}} variant='body'>
              {post.description}
            </Typography>
            </Box>
            <Button disableElevation component={Link} to={`/singlepost/${post._id}`}  variant='contained' color='secondary' size= 'small'>Read more</Button>
          </Box>
        </Paper>
        ))
      }
    </Box>
  )
}

export default AllPost