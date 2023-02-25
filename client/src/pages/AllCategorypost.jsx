import { Box } from '@mui/material'
import React from 'react'
import PostCard from '../components/Homepage/PostCard'

const AllCategorypost = () => {
    return (
        <>
            <Box component={'div'} sx={{ margin: '30px 0' }}>
                <PostCard name='Health Category' category='phone' />
                <PostCard name='Gem Category' category='phone' />
                <PostCard name='Computer Category' category='phone' />
                <PostCard name='Tecnology Category' category='phone' />
            </Box>
        </>
    )
}

export default AllCategorypost