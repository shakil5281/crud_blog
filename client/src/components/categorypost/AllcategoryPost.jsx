import React from 'react'
import { Box } from '@mui/material'
import PostCard from './PostCard'
import axios from 'axios'
import { getToken } from '../../helper/SessonStorage'


const AxiosHeader = { headers: { "token": getToken() } }

const Allcategoryposts = () => {
    const [data, setsummary] = React.useState({})

    const SummaryCount = async () => {
        try {
            const { data } = await axios.get('/allcategorypost', AxiosHeader)
            setsummary(data.summary)
        } catch (err) {
            console.log(err.response.data.error)
        }
    }
    React.useEffect(() => {
        SummaryCount()
    }, [])
    return (
        <>
            <Box>
                {
                    Array.from(data).map((post, i) => (
                        <Box key={i.toString()} component={'div'}>
                            <PostCard post= {post} />
                        </Box>
                    ))
                }
            </Box>
        </>
    )
}

export default Allcategoryposts