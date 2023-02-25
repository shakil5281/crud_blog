import React from 'react'
import SingleHooks from '../../Hooks/SingleHooks'
import {Box, Typography} from '@mui/material'

const SinglePost = () => {
    const post = SingleHooks()
  return (
    <>
      <Box>
        <Box>
            <Box sx={{display: 'flex', justifyContent: 'center'}}>
              <img style={{width: '700px'}} src={`/uploads/${post.photo}`} alt='post' />
            </Box>
            <Typography sx={{padding: '15px 0'}} variant='h4'>
            {post.title}
          </Typography>
          <Typography>
            {post.description}
          </Typography>
        </Box>
      </Box>
    </>
  )
}

export default SinglePost