import axios from 'axios'
import React from 'react'
import { useParams } from 'react-router-dom'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box, CardActionArea } from '@mui/material';
import { Link } from 'react-router-dom';
import { getToken } from '../../helper/SessonStorage';


const AxiosHeader = { headers: { "token": getToken() } }

const CategoryPost = () => {

    const param = useParams()
    const [data, setdata] = React.useState({})

const CategoriesPost = async() =>{
    try{
        const {data} = await axios.get(`/categorypost/${param.category}`, AxiosHeader)
        setdata(data)
        console.log(data)

    }catch(err){
        console.log(err)
    }
}


    React.useEffect(()=>{
        CategoriesPost()
    }, [])
  return (
    <>
    <Box sx={{marginTop: 5}}>
        <Typography sx={{marginLeft: 2}} variant='h5' color= 'primary' >
        {param.category} -
        </Typography>
        <Box sx={{display: 'flex', flexWrap: 'wrap'}}>
            {
               Array.from(data).map((post, i) => (
                    <Card key={i.toString()} sx={{ maxWidth: 230, marginLeft:4, marginTop: 4 }}>
                        <Link to={`/singlepost/${post._id}`}>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height="140"
                                image={`/uploads/${post.photo}`}
                                alt="green iguana"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {post.title}
                                </Typography>
                                <Typography sx={{height: '60px', overflow: 'hidden'}} variant="body2" color="text.secondary">
                                    {post.description}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                        </Link>
                    </Card>
                ))
            }
        </Box>
    </Box>
</>
  )
}

export default CategoryPost