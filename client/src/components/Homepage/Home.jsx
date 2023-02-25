import React from 'react'
import { Box , Typography} from '@mui/material'
import HomeHeaderImg from './HomeHeaderImg'
import PostCard from './PostCard'
import axios from 'axios'
import { getToken } from '../../helper/SessonStorage'


const AxiosHeader = { headers: { "token": getToken() } }

const Home = () => {
    const [data, setsummary] = React.useState({})

    const SummaryCount = async () => {
        try {
            const { data } = await axios.get('/allcategorypost', AxiosHeader)
            setsummary(data.summary)
            console.log(data.summary)
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
                <HomeHeaderImg />
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

export default Home